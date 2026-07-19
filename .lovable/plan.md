Phase 9.14.1b — TTC Treatment Pathway Panel Polish

Scope
- Remove the green "Treatment pathways" cluster from the TTC hub topic directory so only three groups remain: Timing, testing and waiting; Health and preparation; Fertility support.
- Keep and tighten the purple connected hub panel below the topic directory so it becomes the clear, premium treatment pathway entry point.
- No changes to articles, article data, TTC Journey, calculators, redirects, sitemap, robots, SEO infra, routes, or non-TTC content.

Files to edit
- src/pages/TTCHub.tsx — only file to edit.
- src/components/ttc/TTCIVFPathway.tsx — only if the panel copy is componentised there (it is imported into TTCHub.tsx); edit the copy there if so, otherwise edit directly in TTCHub.tsx.

Plan
1. Update TopicLibrary in src/pages/TTCHub.tsx
   - Drop the fourth cluster { label: "Treatment pathways", slugs: ["ivf-and-treatment"] }.
   - Remove the special slug === "ivf-and-treatment" ? "/ivf" : topic.mainHref logic, since the ivf-and-treatment slug will no longer appear in this directory.
   - Verify the three remaining groups render as a balanced topic directory.

2. Keep the purple connected hub panel (TTCIVFPathway) immediately after TopicLibrary.
   - If TTCIVFPathway is a component, update its copy to:
     - Eyebrow: "Treatment pathway"
     - Title: "When treatment becomes part of the conversation"
     - Body: "If you are starting to think about fertility treatment or IVF, this connected hub gives you a calmer place to understand timelines, transfer preparation, the IVF two-week wait and early pregnancy after IVF."
     - CTA: "Go to IVF hub" (link to /ivf)
     - Small card title: "A separate, calmer guide"
     - Small card body: "Treatment timelines, transfer preparation and IVF-specific support in one place."
   - If TTCIVFPathway is inlined in TTCHub.tsx, update the same copy there.

3. Run verification
   - bunx tsgo --noEmit
   - Confirm /trying-to-conceive no longer shows the green IVF treatment card.
   - Confirm the purple panel remains, links to /ivf, and uses the new copy.
   - Confirm the topic directory has exactly three groups and feels balanced.

Deliverables to report
- Files edited
- Green card removal result
- Purple panel copy result
- /ivf link preservation
- Topic directory result
- Preservation checklist
- bunx tsgo --noEmit result
- Whether it is safe to proceed to TTC-wide QA