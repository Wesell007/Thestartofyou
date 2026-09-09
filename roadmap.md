# Roadmap — Journey Setup Experience

- [ ] Confirm baseline (113 files / 1277 tests, lint 1 error + 10 warnings)
- [ ] Shared setup design language components (`src/components/setup/`)
- [ ] TTC: three-step guided setup, same fields/validation/save, privacy copy
- [ ] Pregnancy: new non-indexed `/setup/pregnancy`, one calculation implementation, no dates in URL, minimum pending payload
- [ ] First Year: public pre-auth setup, in-page guards, 24h bounded pending state, existing companion + review steps after auth
- [ ] Auth contextual copy derived from return route only
- [ ] Pregnancy-committed entry points → `/setup/pregnancy`; generic entries stay on `/start-your-journey`
- [ ] Focused tests + full suite, typecheck x2, lint, build
- [ ] Runtime QA six combinations; no deploy
- [ ] 30-point report
