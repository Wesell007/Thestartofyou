import glob, re, os, hashlib, subprocess
os.chdir("C:/Users/Administrator/Desktop/Thestartofyou")
files = sorted(f.replace(os.sep, "/") for f in glob.glob("supabase/migrations/*.sql"))
head = subprocess.run(["git", "rev-parse", "--short", "HEAD"], capture_output=True, text=True).stdout.strip()
print(f"migration count: {len(files)}  (HEAD {head})")
def blobsha(f): return hashlib.sha256(subprocess.run(["git", "show", "HEAD:" + f], capture_output=True).stdout).hexdigest()
pat = {
    "cron.schedule": r"cron\.schedule\(", "net.http_*": r"net\.http_(post|get)\(", "vault ref": r"vault\.",
    "hard-coded project ref": r"\b[a-z]{20}\.supabase\.(co|in)\b", "hard-coded http(s) URL": r"https?://",
    "JWT/secret literal": r"eyJ[A-Za-z0-9_-]{10,}|sb_secret_[A-Za-z0-9]|sbp_[A-Za-z0-9]",
    "storage.buckets insert": r"insert\s+into\s+storage\.buckets", "trigger on auth.users": r"on\s+auth\.users",
    "SECURITY DEFINER": r"security\s+definer", "external e-mail provider call": r"(resend|sendgrid|mailgun|api\.lovable|smtp)",
}
tot = {k: 0 for k in pat}
for i, f in enumerate(files, 1):
    s = open(f, encoding="utf8").read()
    s_nc = "\n".join(l for l in s.split("\n") if not l.strip().startswith("--"))
    hits = []
    for k, p in pat.items():
        n = len(re.findall(p, s_nc, re.I))
        if n: hits.append(f"{k}={n}"); tot[k] += n
    print(f"{i:02d} {os.path.basename(f)} sha256:{blobsha(f)[:12]} {'; '.join(hits)}")
print("\nTOTALS (comment lines excluded):", tot)
expected = {"20261009055319": "bc73c427", "20261009055322": "99c42be0", "20261009091430": "c2f34cb3", "20261009140726": "63348e3a",
            "20261011050645": "b6899e9a", "20261011050647": "9f9acf6f", "20261015053138": "8dde2626"}
ok = all(any(os.path.basename(f).startswith(v) and blobsha(f).startswith(h) for f in files) for v, h in expected.items())
print("M1-M7 present with accepted hashes (M1 bc73c427, M2 99c42be0, M3 c2f34cb3, M4 63348e3a, M5 b6899e9a, M6 9f9acf6f, M7 8dde2626):", ok)
print("41B.1A in push set:", any("41b1a" in f.lower() or "family_entity" in f.lower() for f in files))
print("41B.1A pending files (outside supabase/migrations):", sorted(os.listdir("docs/strategy/migrations-pending")))
print("41B.1B migration exists anywhere:", any("41b1b" in f.lower() for f in glob.glob("**/*.sql", recursive=True)))
