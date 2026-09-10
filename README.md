# TensorBlack — website

The redesigned About page, rebuilt as **Company**. Static, self-contained, no
build step and no dependencies beyond two web fonts. Open `index.html`, or
serve the folder:

```
python3 -m http.server 8000
```

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Company page — markup and copy |
| `working-with.html` | Working with TensorBlack — markup and copy |
| `faculty.html` | Faculty — markup and roster |
| `styles.css` | Palette, typography and layout, shared by both pages |
| `main.js` | Two filters: the coverage board and the faculty roster |

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

## Working with TensorBlack

A second page, in the same design system. It expands section 6 of the Company
page — which is one statement, one action, one inbox — into the page the
people who want to engage actually need.

**The copy on this page is not from the source document.** Everything on the
Company page came from Karen's draft. This page had no copy, so it is written
here and every line needs review. Three sections carry more risk than the
rest:

- **"What commercial support does and does not include"** restates the
  independence policy as a commercial boundary. The exclusions are taken from
  the source document's own sentence — sponsors do not select topics, review
  content prior to publication, or approve faculty — but the inclusions are
  drafted here and describe what TensorBlack sells. Andrea and Jordan should
  confirm both columns.
- **"What happens after you write"** describes internal routing. It commits
  to no response time on purpose; adding one is a decision with an owner.
- **"Sponsorship starts with the calendar"** asserts how the first commercial
  conversation goes. Confirm with whoever runs sponsorship.

No figures, prices, tiers or packages appear anywhere on the page, and none
should be added without a decision about what is publishable.

### Structure

Six sections, matching the Company page's rhythm:

1. **Hero** — the page's thesis, that there are four routes in and one line
   none of them cross.
2. **Four routes, one inbox** — sponsorship, faculty nomination, speaking,
   press. Each row carries a "What to send" line, which is what makes a single
   shared inbox workable rather than a black hole.
3. **The line** — two facing columns divided by a hairline. The page's whole
   argument is that these two lists stay separate.
4. **Disclosure** — the governance statements, on the field ground, matching
   how the Company page treats the same material.
5. **What happens next** — numbered, because it is a real sequence. Nothing
   else on either page is numbered.
6. **Get in touch** — the closing statement from the source document.

### Open decisions

- **This page has no home in the information architecture.** The source
  document specifies the nav as content, programs, events, faculty, company,
  and the footer Company column as about, news, contact, terms, privacy.
  Neither includes this page, so nothing links to it yet. The natural fix is
  to point the Company page's "Get in touch" button here instead of at
  `/contact`. That has not been done, because it would change a page already
  reviewed.
- The masthead marks **Company** as the current item, on the assumption this
  page sits beneath it. If it is meant to be top-level, that changes.

## Faculty

The page the Company page's coverage board points at: "Each area maps to
named faculty on the faculty page."

**No roster exists yet.** Section 6 of the source document records that the
roster and bio folder links did not come through. So all 24 cards are
placeholders — "Faculty name", "Institution", and a portrait block — in the
same spirit as the `000` figures. No names, institutions or biographies have
been invented. What is real is the taxonomy: each card carries a genuine
coverage area from the source document, so the filter demonstrably works and
the mapping to the board can be checked.

### The representation requirement is built into the markup

Section 5 of the document requires that the visible default set, before any
filtering or scrolling, is a proper male/female mix, and states plainly that
sorting alphabetically or by date added will not reliably produce one. It
also says the requirement "needs to be designed in rather than fixed at
content-entry time."

So the roster order is **stored by hand and rendered as written**. It rotates
through the four coverage areas, which is why the first screen spans the
bench instead of showing whoever sorts first. A comment above the roster in
`faculty.html` says this, and says what must not be done to it:

> If a CMS ever renders this list, it must preserve a hand-set order field.
> Do not replace it with ORDER BY surname or ORDER BY created.

That is the whole mechanism. It only survives if whoever wires this to a
content system respects it, which is why it is written in the markup rather
than left in a document.

### Why this filter hides and the coverage board dims

They look identical and behave differently, on purpose. The board argues
breadth, so dimming keeps the whole map visible — that is what the document
specifies. The roster is how a visitor reaches a particular person, so
narrowing it has to actually narrow it.

### Open items

- The roster is a placeholder. Real faculty, portraits, and per-person
  disclosure links are needed before launch.
- Portraits are 4:5 and lead the card, answering the advisor note that
  faculty images are small and do not convey expertise. Confirm the crop
  before headshots are commissioned.
- The role chips (hosts, teaches, speaks, advises) come from the source
  document's description of faculty. Confirm these are the right four.
- **Placement.** This page is built as top-level `/faculty`, which is where
  the nav and the Company page's coverage board both already point, and
  which matches the document's information architecture. It was requested as
  a subpage under Company. Moving it there means changing which nav item
  carries `aria-current` and adding a breadcrumb.
