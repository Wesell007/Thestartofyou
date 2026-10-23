@echo off
rem DESIGN-ONLY / NON-RUNTIME. Serves the TSOY flagship prototypes on localhost only (no deployment, no Supabase).
rem Open http://localhost:4310/ (review index) or http://localhost:4310/compare.html
cd /d "%~dp0.."
python -m http.server 4310 --bind 127.0.0.1 --directory "%CD%"
