# G3 shared guard + HTTP helpers. Every remote HTTP call in G3 goes through this module.
# - Target: exactly the owner-confirmed ref in target_ref.txt, equal to env G3_EXPECT_REF, never denylisted.
# - Management API: GET only, and only /v1/projects/<target>[...] or /v1/organizations/<slug>.
# - Auth API: only https://<target>.supabase.co/auth/v1/...
# - Credentials are read from protected files and never printed; outputs are checked for leaks.
import json, os, pathlib, re, sys, urllib.request, urllib.error

G3 = pathlib.Path(r"C:\Users\Administrator\.g3")
DENY = {"wogepxfipdipogyogced", "wwtcnbjhttjtklpxhrkd", "dlftnirrnirlkhxpofoq"}


def die(msg):
    print(f"G3 GUARD REFUSED: {msg}", file=sys.stderr)
    sys.exit(97)


def target():
    f = G3 / "target_ref.txt"
    if not f.exists():
        die("no target_ref.txt")
    ref = f.read_text().strip()
    if not re.fullmatch(r"[a-z]{20}", ref):
        die("malformed target")
    if ref in DENY:
        die(f"target {ref} is denylisted")
    exp = os.environ.get("G3_EXPECT_REF", "")
    if not exp:
        die("G3_EXPECT_REF not set")
    if exp != ref:
        die("target mismatch")
    return ref


def _secret(name):
    p = G3 / name
    if not p.exists() or p.stat().st_size == 0:
        die(f"{name} missing")
    return p.read_text().strip()


def secrets_in_play():
    out = []
    for n in ("g3.pat", "g3.dbpass", "g3.service_key", "g3.anon_key"):
        p = G3 / n
        if p.exists() and p.stat().st_size:
            out.append(p.read_text().strip())
    return out


def assert_no_secret(text):
    for s in secrets_in_play():
        if s and s in text:
            die("a credential value appeared in output; refusing to continue")
    if re.search(r"sbp_[A-Za-z0-9]{20,}|sb_secret_[A-Za-z0-9]{8,}|eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}", text):
        die("credential-shaped value in output")


def _http(method, url, headers, body=None, timeout=60):
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, method=method, data=data)
    for k, v in headers.items():
        req.add_header(k, v)
    if body is not None:
        req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, r.read().decode()
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()


def mgmt_get(path):
    ref = target()
    ok = re.fullmatch(rf"/v1/projects/{ref}(/[a-z0-9/_\-]+)?(\?[a-z=&_]+)?", path) or re.fullmatch(r"/v1/organizations/[a-z0-9\-]+", path)
    if not ok:
        die(f"management path not allowed: {path}")
    for d in DENY:
        if d in path:
            die("denylisted ref in path")
    tok = _secret("g3.pat")
    return _http("GET", "https://api.supabase.com" + path, {"Authorization": "Bearer " + tok, "User-Agent": "g3-rehearsal"})


def auth_call(method, path, body=None, key="service"):
    ref = target()
    if not path.startswith("/auth/v1/"):
        die("only /auth/v1/ paths are allowed")
    k = _secret("g3.service_key" if key == "service" else "g3.anon_key")
    return _http(method, f"https://{ref}.supabase.co{path}", {"apikey": k, "Authorization": "Bearer " + k}, body)
