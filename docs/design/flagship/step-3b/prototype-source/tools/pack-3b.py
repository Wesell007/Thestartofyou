# DESIGN-ONLY / NON-RUNTIME. Builds the Step 3B refined founder review pack: compressed JPEG copies for Git, the
# baby-growth comparison, previous-vs-refined comparisons at both widths, a contact sheet, hero-film strips and the
# journal-retention sheets when present. Run with: python -I pack-3b.py [out_dir]
import os, sys
from PIL import Image, ImageDraw, ImageFont

ROOT = "C:/Users/Administrator/.tsoy-design/flagship-prototypes"
REV = f"{ROOT}/3b/review"
V1 = f"{ROOT}/3b/review-v1"
HF = "C:/Users/Administrator/.tsoy-design/higgsfield-explorations/hero-film"
OUT = sys.argv[1] if len(sys.argv) > 1 else "C:/Users/Administrator/Desktop/Thestartofyou/docs/design/flagship/step-3b/review"
os.makedirs(OUT, exist_ok=True)
PAPER = (248, 247, 243); INK = (31, 30, 28)
try: FONT = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 22)
except Exception: FONT = ImageFont.load_default()

def save(im, name, q=70, maxw=None, maxh=None):
    im = im.convert("RGB")
    if maxw and im.width > maxw: im = im.resize((maxw, round(im.height * maxw / im.width)), Image.LANCZOS)
    if maxh and im.height > maxh: im = im.crop((0, 0, im.width, maxh))
    im.save(f"{OUT}/{name}", quality=q, optimize=True, progressive=True)
    return im

def fit(im, w, h=None):
    im = im.convert("RGB").resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    if not h: return im
    if im.height >= h: return im.crop((0, 0, w, h))
    canvas = Image.new("RGB", (w, h), PAPER); canvas.paste(im, (0, 0)); return canvas

# 1. compressed copies (desktop downscaled to 960 wide; mobile native 390; long pages capped)
plan = [
    ("homepage-desktop", 960, 5400), ("homepage-mobile", None, 7000),
    ("homepage-hero-desktop", 960, None), ("homepage-hero-mobile", None, None), ("homepage-hero-poster-desktop", 960, None),
    ("homepage-hero-film-c-desktop", 960, None), ("homepage-hero-h2-desktop", 960, None), ("homepage-hero-h3-desktop", 960, None),
    ("homepage-chapters-desktop", 960, None), ("homepage-chapters-mobile", None, None), ("homepage-printweb-desktop", 960, None),
    ("homepage-memories-desktop", 960, None), ("homepage-memories-mobile", None, None),
    ("my-week-12-desktop", 960, 4600), ("my-week-12-mobile", None, 7200), ("my-week-40-desktop", 960, 4600), ("my-week-8-mobile", None, 7200),
    ("my-week-spread-12-desktop", 960, None), ("my-week-spread-12-mobile", None, None),
    ("my-week-growth-sheet-desktop", 960, None), ("my-week-growth-sheet-mobile", None, None),
    ("my-week-memories-desktop", 960, None), ("my-week-memories-mobile", None, None),
    ("my-week-memory-video-desktop", None, None), ("my-week-memory-voice-desktop", None, None),
    ("my-week-journal-bridge-desktop", 960, None), ("my-week-journal-bridge-mobile", None, None),
    ("companion-answer-desktop", 960, None), ("companion-answer-mobile", None, None), ("companion-not-found-desktop", 960, None),
    ("companion-seek-help-mobile", None, None), ("companion-owner-cue-desktop", 960, None), ("companion-owner-cue-mobile", None, None),
    ("chapter-illustrations-desktop", 1200, None), ("tokens-swatch-desktop", 960, None),
]
for name, maxw, maxh in plan:
    p = f"{REV}/{name}.png"
    if os.path.exists(p): save(Image.open(p), f"{name}.jpg", maxw=maxw, maxh=maxh)
    else: print("missing capture", name)

# 2. baby growth comparison: the five plates side by side, desktop and mobile
for vp, pw in (("desktop", 360), ("mobile", 240)):
    plates = [Image.open(f"{REV}/my-week-plate-{w}-{vp}.png").convert("RGB") for w in (8, 12, 20, 30, 40)]
    ph = max(round(p.height * pw / p.width) for p in plates)
    sheet = Image.new("RGB", (pw * 5 + 60, ph + 70), PAPER); d = ImageDraw.Draw(sheet)
    for i, (w, p) in enumerate(zip((8, 12, 20, 30, 40), plates)):
        sheet.paste(fit(p, pw), (10 + i * (pw + 10), 50)); d.text((10 + i * (pw + 10), 14), f"Week {w}", fill=INK, font=FONT)
    save(sheet, f"baby-growth-comparison-{vp}.jpg", q=78)

# 3. previous (v1) vs refined (v2), both widths, top of each surface
def compare(vp, cw, ch, name):
    pairs = [("homepage", "homepage"), ("my-week", "my-week-12"), ("companion", "companion-answer")]
    cols = []
    for label, f in pairs:
        A = Image.open(f"{V1}/{f}-{vp}.png"); B = Image.open(f"{REV}/{f}-{vp}.png")
        col = Image.new("RGB", (cw * 2 + 30, ch + 50), PAPER); dd = ImageDraw.Draw(col)
        dd.text((10, 10), f"{label} · previous 3B", fill=INK, font=FONT); dd.text((cw + 30, 10), f"{label} · refined", fill=INK, font=FONT)
        col.paste(fit(A, cw, ch), (10, 44)); col.paste(fit(B, cw, ch), (cw + 30, 44)); cols.append(col)
    sheet = Image.new("RGB", (cols[0].width, sum(c.height for c in cols) + 20), PAPER); y = 10
    for c in cols: sheet.paste(c, (0, y)); y += c.height
    save(sheet, name, q=70)
compare("desktop", 600, 1300, "3b-v1-vs-v2-desktop.jpg")
compare("mobile", 390, 1500, "3b-v1-vs-v2-mobile.jpg")

# 4. contact sheet
tiles = [("homepage-desktop", "Homepage 1440"), ("homepage-mobile", "Homepage 390"), ("my-week-12-desktop", "My Week 1440"), ("my-week-12-mobile", "My Week 390"),
         ("companion-answer-desktop", "Companion 1440"), ("companion-answer-mobile", "Companion 390"), ("homepage-chapters-desktop", "Chapter system"), ("my-week-memories-desktop", "Memories: write / photo / video / voice")]
tw, th = 440, 700
cs = Image.new("RGB", (tw * 4 + 50, th * 2 + 90), PAPER); dcs = ImageDraw.Draw(cs)
for i, (name, label) in enumerate(tiles):
    x = 10 + (i % 4) * (tw + 10); yy = 40 + (i // 4) * (th + 40)
    cs.paste(fit(Image.open(f"{REV}/{name}.png"), tw, th), (x, yy)); dcs.text((x, yy - 28), label, fill=INK, font=FONT)
save(cs, "contact-sheet.jpg", q=72)

# 5. hero-film strips, posters and journal-retention sheets, when present
for c in ("B-refined", "C-refined"):
    for suffix, outname in ((f"film-{c}-strip.jpg", f"hero-film-{c}-frames.jpg"), (f"journal-retention-{c[0]}.jpg", f"journal-retention-{c[0]}.jpg")):
        p = f"{HF}/{suffix}"
        if os.path.exists(p): save(Image.open(p), outname, q=72, maxw=1800)
for c in ("A-field-lifecycle", "B-home-journal", "C-progression"):
    p = f"{HF}/concept-{c}-kling-o3-strip.jpg"
    if os.path.exists(p): save(Image.open(p), f"hero-film-concept-{c}-frames.jpg", q=68, maxw=1600)
for n in ("hero-poster", "hero-poster-C"):
    p = f"{ROOT}/3b/media/{n}.jpg"
    if os.path.exists(p): save(Image.open(p), f"{n}.jpg", q=72, maxw=960)

total = sum(os.path.getsize(f"{OUT}/{f}") for f in os.listdir(OUT))
print("files", len(os.listdir(OUT)), "total MB", round(total / 1e6, 2), "->", OUT)
