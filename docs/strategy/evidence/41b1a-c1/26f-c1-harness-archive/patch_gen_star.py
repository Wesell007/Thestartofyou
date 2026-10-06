import pathlib
p = pathlib.Path(r"C:\Users\Administrator\.c1\gen_c1_8.py")
s = p.read_text(encoding="utf-8")
if "STAR_ONLY" not in s:
    old_def = 'def case(tag, table, expect, sql, after_select=None):\n    """expect: \'OK\' or \'FK\'. Emits a marker, the statement (with savepoint if FK), and an optional verification select."""\n    global sp\n'
    new_def = ('import os\nSTAR = bool(os.environ.get("STAR_ONLY"))\n'
               'def case(tag, table, expect, sql, after_select=None):\n'
               '    """expect: OK or FK. Emits a marker, the statement (with savepoint if FK), and an optional verification select."""\n'
               '    global sp\n'
               '    if STAR and not (tag.startswith("I1 ") or tag.startswith("I2 ") or tag.startswith("I1/I5a") or tag.startswith("I2/I6")):\n'
               '        return\n')
    assert s.count(old_def) == 1, "case() header not found"
    s = s.replace(old_def, new_def)
    old_open = r'open(r"C:\Users\Administrator\.c1\C1_8_ownership_matrix.sql", "w", encoding="utf-8", newline="\n")'
    new_open = r'open(os.environ.get("OUT_SQL", r"C:\Users\Administrator\.c1\C1_8_ownership_matrix.sql"), "w", encoding="utf-8", newline="\n")'
    assert s.count(old_open) == 1, "open() not found"
    s = s.replace(old_open, new_open)
    p.write_text(s, encoding="utf-8", newline="\n")
print("generator patched" if "STAR_ONLY" in p.read_text(encoding="utf-8") else "patch failed")
