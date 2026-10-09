# N10.1 shared guard + HTTP helpers (derived from the accepted G3 g3lib.py).
# - Target: exactly the owner-confirmed ref in target_ref.txt, equal to env N10_EXPECT_REF, never denylisted.
# - Management API: GET only, /v1/projects/<target>[...].
# - Project API: only https://<target>.supabase.co/auth/v1/... and /storage/v1/...
# - Credentials and user tokens are read from protected files and never printed; outputs are leak-checked.
import json, os, pathlib, re, sys, urllib.request, urllib.error

N10 = pathlib.Path(os.environ.get("N10_DIR", r"C:\Users\Administrator\.n10r1"))
DENY = {"wogepxfipdipogyogced", "wwtcnbjhttjtklpxhrkd", "dlftnirrnirlkhxpofoq", "czhopceorfqxdbfvlnap"}
SECRET_FILES = ("n10r1.pat", "n10r1.dbpass", "n10r1.service_key", "n10r1.anon_key")


def die(msg):
    print(f"N10 GUARD REFUSED: {msg}", file=sys.stderr)
    sys.exit(97)


def target():
    f = N10 / "target_ref.txt"
    if not f.exists():
        die("no target_ref.txt")
    ref = f.read_text().strip()
    if not re.fullmatch(r"[a-z]{20}", ref):
        die("malformed target")
    if ref in DENY:
        die(f"target {ref} is denylisted")
    exp = os.environ.get("N10_EXPECT_REF", "")
    if not exp:
        die("N10_EXPECT_REF not set")
    if exp != ref:
        die("target mismatch")
    return ref


def _secret(name):
    p = N10 / name
    if not p.exists() or p.stat().st_size == 0:
        die(f"{name} missing")
    return p.read_text().strip()


def secrets_in_play():
    out = [(N10 / n).read_text().strip() for n in SECRET_FILES if (N10 / n).exists() and (N10 / n).stat().st_size]
    users = N10 / "n10r1.users.json"
    if users.exists():
        for u in json.loads(users.read_text()).values():
            out += [v for k, v in u.items() if k in ("password", "access_token", "refresh_token") and v]
    return out


def assert_no_secret(text):
    for s in secrets_in_play():
        if s and s in text:
            die("a credential value appeared in output; refusing to continue")
    if re.search(r"sbp_[A-Za-z0-9]{20,}|sb_secret_[A-Za-z0-9]{8,}|eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}", text):
        die("credential-shaped value in output")


def _http(method, url, headers, body=None, raw=None, timeout=60):
    data = raw if raw is not None else (json.dumps(body).encode() if body is not None else None)
    req = urllib.request.Request(url, method=method, data=data)
    for k, v in headers.items():
        req.add_header(k, v)
    if body is not None and raw is None:
        req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, r.read().decode(errors="replace")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode(errors="replace")


def mgmt_get(path):
    ref = target()
    if not re.fullmatch(rf"/v1/projects/{ref}(/[a-z0-9/_\-]+)?(\?[a-z=&_]+)?", path):
        die(f"management path not allowed: {path}")
    return _http("GET", "https://api.supabase.com" + path, {"Authorization": "Bearer " + _secret("n10r1.pat"), "User-Agent": "n10r1-rehearsal"})


def project_call(method, path, *, key="service", bearer=None, body=None, raw=None, headers=None):
    """key: 'service' | 'anon'. bearer: explicit user access token (else the key itself)."""
    ref = target()
    if not (path.startswith("/auth/v1/") or path.startswith("/storage/v1/")):
        die("only /auth/v1/ and /storage/v1/ paths are allowed")
    k = _secret("n10r1.service_key" if key == "service" else "n10r1.anon_key")
    h = {"apikey": k, "Authorization": "Bearer " + (bearer or k)}
    h.update(headers or {})
    return _http(method, f"https://{ref}.supabase.co{path}", h, body=body, raw=raw)
