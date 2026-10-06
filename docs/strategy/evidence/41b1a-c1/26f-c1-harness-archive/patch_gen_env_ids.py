import pathlib
p = pathlib.Path(r"C:\Users\Administrator\.c1\gen_c1_8.py")
s = p.read_text(encoding="utf-8")
if "C1_USER_A" not in s:
    old = 'A = "b09cd318-8f3e-4853-8d97-fc10267b3d69"\nB = "820f49d1-2ebc-4bf1-a1e5-f6d32491bbbb"\nC = "6e65487d-ddb0-43b6-a623-fb24b5318dab"\n'
    new = ('import os as _os\n'
           'A = _os.environ.get("C1_USER_A", "b09cd318-8f3e-4853-8d97-fc10267b3d69")\n'
           'B = _os.environ.get("C1_USER_B", "820f49d1-2ebc-4bf1-a1e5-f6d32491bbbb")\n'
           'C = _os.environ.get("C1_USER_C", "6e65487d-ddb0-43b6-a623-fb24b5318dab")\n')
    assert s.count(old) == 1, "user id block not found"
    s = s.replace(old, new)
    p.write_text(s, encoding="utf-8", newline="\n")
print("generator reads C1_USER_A/B/C from the environment" if "C1_USER_A" in p.read_text(encoding="utf-8") else "patch failed")
