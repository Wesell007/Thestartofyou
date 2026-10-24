# DESIGN-ONLY / NON-RUNTIME. Builds the Step 3B founder review pack: compressed JPEG copies for Git, a baby-growth
# comparison image, a 3A-vs-3B comparison, and a contact sheet. Run with: python -I pack-3b.py
import os, sys
from PIL import Image, ImageDraw, ImageFont

ROOT = "C:/Users/Administrator/.tsoy-design/flagship-prototypes"
REV = f"{ROOT}/3b/review"
OLD = f"{ROOT}/review"
HF = "C:/Users/Administrator/.tsoy-design/higgsfield-explorations/hero-film"
OUT = "C:/Users/Administrator/Desktop/Thestartofyou/docs/design/flagship/step-3b/review"
os.makedirs(OUT, exist_ok=True)
PAPER = (248, 247, 243)

def save(im, name, q=70, maxw=None, maxh=None):
    im = im.convert("RGB")
    if maxw and im.width > maxw:
        im = im.resize((maxw, round(im.height * maxw / im.width)), Image.LANCZOS)
    if maxh and im.height > maxh:
        im = im.crop((0, 0, im.width, maxh))
    im.save(f"{OUT}/{name}", quality=q, optimize=True, progressive=True)
    return im

# 1. compressed copies (desktop downscaled to 960 wide; mobile native 390; long pages capped)
plan = [
    ("homepage-desktop.png", 960, 5200), ("homepage-mobile.png", None, 7200),
    ("homepage-hero-desktop.png", 960, None), ("homepage-hero-mobile.png", None, None),
    ("homepage-hero-poster-desktop.png", 960, None), ("homepage-hero-h2-desktop.png", 960, None), ("homepage-hero-h3-desktop.png", 960, None),
    ("my-week-12-desktop.png", 960, 4200), ("my-week-12-mobile.png", None, 6200),
    ("my-week-40-desktop.png", 960, 4200), ("my-week-growth-sheet-desktop.png", 960, None), ("my-week-growth-sheet-mobile.png", None, None),
    ("companion-answer-desktop.png", 960, None), ("companion-answer-mobile.png", None, None),
    ("companion-not-found-desktop.png", 960, None), ("companion-seek-help-mobile.png", None, None), ("companion-owner-cue-desktop.png", 960, None), ("companion-owner-cue-mobile.png", None, None),
]
for name, maxw, maxh in plan:
    save(Image.open(f"{REV}/{name}"), name.replace(".png", ".jpg"), maxw=maxw, maxh=maxh)

# 2. baby growth comparison: the five plates side by side (desktop captures)
plates = [Image.open(f"{REV}/my-week-plate-{w}-desktop.png").convert("RGB") for w in (8, 12, 20, 30, 40)]
pw = 360; ph = max(round(p.height * pw / p.width) for p in plates)
sheet = Image.new("RGB", (pw * 5 + 60, ph + 70), PAPER)
d = ImageDraw.Draw(sheet)
try: font = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 22)
except Exception: font = ImageFont.load_default()
for i, (w, p) in enumerate(zip((8, 12, 20, 30, 40), plates)):
    p = p.resize((pw, round(p.height * pw / p.width)), Image.LANCZOS)
    sheet.paste(p, (10 + i * (pw + 10), 50))
    d.text((10 + i * (pw + 10), 14), f"Week {w}", fill=(31, 30, 28), font=font)
save(sheet, "baby-growth-comparison.jpg", q=78)

# 3. 3A vs 3B: three surfaces, desktop, top 1800 px of each
pairs = [("homepage", "homepage-desktop.png", "homepage-desktop.png"), ("my-week", "my-week-a-owner-active-desktop.png", "my-week-12-desktop.png"), ("companion", "companion-answer-desktop.png", "companion-answer-desktop.png")]
cols = []
for label, a, b in pairs:
    A = Image.open(f"{OLD}/{a}").convert("RGB"); B = Image.open(f"{REV}/{b}").convert("RGB")
    cw = 600
    A = A.resize((cw, round(A.height * cw / A.width)), Image.LANCZOS).crop((0, 0, cw, 1200))
    B = B.resize((cw, round(B.height * cw / B.width)), Image.LANCZOS).crop((0, 0, cw, 1200))
    col = Image.new("RGB", (cw * 2 + 30, 1250), PAPER)
    dd = ImageDraw.Draw(col)
    dd.text((10, 10), f"{label} · 3A", fill=(31, 30, 28), font=font); dd.text((cw + 30, 10), f"{label} · 3B", fill=(31, 30, 28), font=font)
    col.paste(A, (10, 44)); col.paste(B, (cw + 30, 44))
    cols.append(col)
cmp_ = Image.new("RGB", (cols[0].width, sum(c.height for c in cols) + 20), PAPER)
y = 10
for c in cols: cmp_.paste(c, (0, y)); y += c.height
save(cmp_, "3a-vs-3b-desktop.jpg", q=70)

# 4. contact sheet: desktop + mobile of the three surfaces plus growth sheet and hero poster
tiles = [("homepage-desktop.png", "Homepage 1440"), ("homepage-mobile.png", "Homepage 390"), ("my-week-12-desktop.png", "My Week 1440"), ("my-week-12-mobile.png", "My Week 390"),
         ("companion-answer-desktop.png", "Companion 1440"), ("companion-answer-mobile.png", "Companion 390"), ("my-week-growth-sheet-desktop.png", "Growth system"), ("homepage-hero-poster-desktop.png", "Hero poster fallback")]
tw, th = 440, 700
cs = Image.new("RGB", (tw * 4 + 50, th * 2 + 90), PAPER)
dcs = ImageDraw.Draw(cs)
for i, (name, label) in enumerate(tiles):
    im = Image.open(f"{REV}/{name}").convert("RGB")
    im = im.resize((tw, round(im.height * tw / im.width)), Image.LANCZOS).crop((0, 0, tw, th))
    x = 10 + (i % 4) * (tw + 10); yy = 40 + (i // 4) * (th + 40)
    cs.paste(im, (x, yy)); dcs.text((x, yy - 28), label, fill=(31, 30, 28), font=font)
save(cs, "contact-sheet.jpg", q=72)

# 5. hero-film strips and the poster
for c in ("A-field-lifecycle", "B-home-journal", "C-progression"):
    save(Image.open(f"{HF}/concept-{c}-kling-o3-strip.jpg"), f"hero-film-concept-{c}-frames.jpg", q=68, maxw=1600)
save(Image.open(f"{ROOT}/3b/media/hero-poster.jpg"), "hero-poster-concept-A.jpg", q=72, maxw=960)

total = sum(os.path.getsize(f"{OUT}/{f}") for f in os.listdir(OUT))
print("files", len(os.listdir(OUT)), "total MB", round(total / 1e6, 2))
