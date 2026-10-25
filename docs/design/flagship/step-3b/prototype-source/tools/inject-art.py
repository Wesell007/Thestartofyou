# DESIGN-ONLY / NON-RUNTIME. Fills every <svg ... data-art="ch-x">...</svg> in the given HTML files with the matching
# <symbol id="ch-x"> content from the shared sheet 3b/art/chapters.svg, so one drawing source feeds every page and the
# page stylesheet can style the lines (content referenced through <use> cannot be styled from the page). Idempotent.
import sys, re, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sheet = open(os.path.join(ROOT, "3b", "art", "chapters.svg"), encoding="utf-8").read()
symbols = {m.group(1): m.group(2).strip() for m in re.finditer(r'<symbol id="([^"]+)"[^>]*>(.*?)</symbol>', sheet, re.S)}
for f in sys.argv[1:]:
    p = os.path.join(ROOT, f)
    h = open(p, encoding="utf-8").read()
    def fill(m):
        sid = m.group(2)
        if sid not in symbols: return m.group(0)
        return m.group(1) + "\n" + symbols[sid] + "\n" + m.group(3)
    new = re.sub(r'(<svg[^>]*data-art="([^"]+)"[^>]*>).*?(</svg>)', fill, h, flags=re.S)
    open(p, "w", encoding="utf-8").write(new)
    print("filled", f, len(re.findall(r'data-art=', new)), "slots;", sorted(symbols))
