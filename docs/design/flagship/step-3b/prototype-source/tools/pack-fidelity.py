# -*- coding: utf-8 -*-
# DESIGN-ONLY / NON-RUNTIME. Builds the precision-fidelity review additions for Git: compressed captures of the
# refreshed homepage and chapter harness, before/after sheets (previous SVG family vs approved watercolour family) at both
# widths, the five-plate comparison against 104D, and the five final plates as quantised 512 px PNGs.
# Usage: python -I pack_fidelity.py [out_dir]
import os, sys, shutil
from PIL import Image, ImageDraw, ImageFont
ROOT = "C:/Users/Administrator/.tsoy-design/flagship-prototypes"
REV = f"{ROOT}/3b/review"; BEFORE = f"{ROOT}/3b/review-before-fidelity"
HF = "C:/Users/Administrator/.tsoy-design/higgsfield-explorations/chapter-illustrations"
OUT = sys.argv[1] if len(sys.argv) > 1 else "C:/Users/Administrator/Desktop/Thestartofyou/docs/design/flagship/step-3b/review"
os.makedirs(OUT, exist_ok=True)
PAPER = (248, 247, 243); INK = (31, 30, 28)
F = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 22)

def save(im, name, q=72, maxw=None, maxh=None):
    im = im.convert("RGB")
    if maxw and im.width > maxw: im = im.resize((maxw, round(im.height * maxw / im.width)), Image.LANCZOS)
    if maxh and im.height > maxh: im = im.crop((0, 0, im.width, maxh))
    im.save(f"{OUT}/{name}", quality=q, optimize=True, progressive=True); return im

def fit(im, w):
    return im.convert("RGB").resize((w, round(im.height * w / im.width)), Image.LANCZOS)

# 1. refreshed captures
for name, maxw, maxh in [("homepage-desktop", 960, 5400), ("homepage-mobile", None, 7000), ("homepage-chapters-desktop", 960, None),
                         ("homepage-chapters-mobile", None, None), ("chapter-illustrations-desktop", 1200, None)]:
    save(Image.open(f"{REV}/{name}.png"), f"{name}.jpg", maxw=maxw, maxh=maxh)

# 2. before / after, both widths
for vp, w in (("desktop", 700), ("mobile", 390)):
    A = fit(Image.open(f"{BEFORE}/homepage-chapters-{vp}.png"), w); B = fit(Image.open(f"{REV}/homepage-chapters-{vp}.png"), w)
    h = max(A.height, B.height)
    sheet = Image.new("RGB", (w * 2 + 30, h + 50), PAPER); d = ImageDraw.Draw(sheet)
    d.text((10, 12), "Before: hand-drawn SVG concept family", fill=INK, font=F); d.text((w + 20, 12), "After: approved watercolour family (Stage B)", fill=INK, font=F)
    sheet.paste(A, (10, 44)); sheet.paste(B, (w + 20, 44))
    save(sheet, f"chapter-illustrations-before-after-{vp}.jpg", q=74)

# 3. five-plate comparison against 104D and the plates themselves (quantised 512 px, from stage-b/git-*.png)
shutil.copy(f"{HF}/stage-b/compare-104d-final.jpg", f"{OUT}/chapter-plates-vs-104d.jpg")
for nm in ("fawn", "rabbit", "robin", "squirrel", "duck"):
    shutil.copy(f"{HF}/stage-b/git-{nm}-512.png", f"{OUT}/chapter-plate-{nm}.png")
# style-lock evidence: the approved sheet 4 and the correction-round comparison, compressed
save(Image.open(f"{HF}/stage-a/sheet-4.png"), "chapter-style-sheet-4-approved.jpg", q=80, maxw=1200)
save(Image.open(f"{HF}/stage-a/compare-104d-v2.jpg"), "chapter-style-lock-vs-104d.jpg", q=70, maxw=1200)
print("packed", sorted(f for f in os.listdir(OUT) if f.startswith("chapter")))
