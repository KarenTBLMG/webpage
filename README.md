# TensorBlack — Company page

The redesigned About page, rebuilt as **Company**. Static, self-contained, no
build step and no dependencies beyond two web fonts. Open `index.html`, or
serve the folder:

```
python3 -m http.server 8000
```

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Markup and all page copy |
| `styles.css` | Palette, typography and layout |
| `main.js` | The coverage filter, and nothing else |

## Source

Built from *About page redesign* (Karen Fecenko-Tacka, 10 September 2026).
Page copy is section 3 of that document; the palette, typography and layout
rules are section 4.

Reviewer commentary from the document — the notes on what needs confirming
from Doug, Sanjay, Andrea and Jordan — is deliberately **not** in the page.
Neither is the design-notes toggle from the mockup, which the document says to
remove before developer handoff.

## Design rules this implements

- **Palette.** Declared once in the `:root` block of `styles.css`. Amber
  (`--signal`) appears in exactly four places: section markers, the active
  filter, link underlines, and button hover. Nothing else may use it.
- **Type.** Archivo for display, headings and interface; Source Serif 4 for
  reading copy.
- **Layout.** Left rail plus content column, everything left-aligned, reading
  measure capped at 62 characters. Capability blocks are rows divided by
  hairlines — not cards. No shadows, no rounded corners, no gradients.
- **Interaction.** The coverage filter is the only control. There is no
  scroll-triggered motion anywhere. Filter buttons carry `aria-pressed`, the
  board is a live region, focus is visible, and reduced motion is respected.

## Open items before launch

These come from section 6 of the source document and are all visible in the
markup:

- Every figure in the capability blocks renders as `000`. Real numbers needed
  for episodes, subscribers, Round Table membership, institutions, SHIFT
  attendees and speakers, faculty headcount, and specialties covered. Any
  figure that should not be published can be deleted without disturbing the
  row.
- The coverage areas are a proposal. Delete any area with no named faculty
  member behind it.
- "How we work" is draft language describing policy and needs confirming line
  by line.
- Nav and footer links point at `/content`, `/programs`, `/events`,
  `/faculty`, `/company`, `/contact`, `/news`, `/terms`, `/privacy`. Repoint
  them at the real URLs. "Get in touch" points at `/contact` rather than a
  `mailto:` because the inbox address was not specified.
- If a defined brand palette and logo files exist, swapping them in means
  editing the `:root` block only.
