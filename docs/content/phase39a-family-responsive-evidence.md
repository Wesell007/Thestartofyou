# Phase 39A Family Responsive Evidence

Status: COMPLETE

Required widths: 1280, 834 and 390 pixels.

Evidence will cover the Family hub and all six canonical topic pages, including hero composition, Start Here, Family area navigation, questions, late Companion placement, related navigation, footer transition, image crops, touch targets, focus visibility, horizontal overflow and console errors.

## Matrix

| Width | Pages | Horizontal overflow | Console errors | Companion labels |
| ---: | ---: | ---: | ---: | ---: |
| 1280 | 7 | 0 | 0 | 1 per page |
| 834 | 7 | 0 | 0 | 1 per page |
| 390 | 7 | 0 | 0 | 1 per page |

The seven pages were the Family hub, Growing families, Relationships, Family basics, Health and safety, Travel and days out, and Play, fun and connection. All returned the expected H1 and stable document width.

## Structure and interaction evidence

- The hub rendered its editorial hierarchy without horizontal overflow at all three widths.
- Every topic rendered its own H1, introduction, coverage list, Start Here collection, situations, questions, one late Family Companion and related navigation.
- The hub had one Family Companion label and each topic had one Family Companion label.
- Accordion controls retained the shared semantic Radix implementation.
- Interactive links and buttons retained visible focus styles and at least 44 pixel minimum height where newly introduced.
- Desktop and mobile screenshots were inspected for the hub and Growing families reference topic.

## Image evidence limitation

The application contains managed asset pointers for the four hub images, six topic heroes and every ready guide image. The isolated localhost browser returned the application HTML shell for those managed asset URLs rather than the files, so it reported the images as unloaded. This is a preview harness limitation, not a missing mapping: the focused test verified all 18 ready guides resolve to an image record. No asset mappings were changed in Phase 39A.

## Phase 39A.1 orientation check

The new text only hub orientation section was reviewed at 1280, 834 and 390 pixels. At all three widths its heading wrapped cleanly, body copy remained readable, the section height stayed controlled, and its transitions from the hero and into Start Here remained visually intentional. Horizontal overflow and console errors were zero. The section is labelled by its heading and adds no interactive controls, imagery or navigation.