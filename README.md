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

## Review round two

Changes applied from Karen's feedback of 11 September 2026. Items marked
**open** are decisions that were raised but not settled, so the page carries
one option and can be switched.

### Applied

- **"The GPS for oncology" is off the Company page.** It was the hero
  headline; it is now nowhere on the site. The replacement is "Independent
  answers, in public.", built from the approved line "We answer those
  questions in public." The standfirst still opens with "Guiding", so the
  wayfinding idea the amber signal echoes survives without the dated
  metaphor. **Open:** whether the phrase is retired outright or reused
  somewhere smaller.
- **"the same questions" is plural.** Two questions follow the colon. The
  next paragraph had to change with it, from "that question" to "those
  questions", or the copy disagreed with itself.
- **"faculty bench" is gone**, on both the Company and Faculty pages. It is
  now "our faculty coalition of national oncology leaders". The Faculty page
  rail label, section id and meta description changed with it.
- **Executive team section added** to the Company page, with a small link at
  the end of "Who we are" matching the block links below it. Names only, no
  portraits: the advisor note that the page read like a team page is what the
  redesign fixed, so this stays a reference list.
- **Podcast is "AI and Healthcare"**, the official name, not "AI &
  Healthcare".
- **CEO Round Table** no longer says executives "compare what they are
  actually deploying". They "share what they are deploying and what they are
  learning from it". Changed on the Working with page too, which carried the
  same claim.
- **Loran Media Group** is now credited with conference and event
  operations only. The media production half is dropped.
- **Faculty nomination is no longer an open invitation.** The Faculty page's
  nomination section is replaced by "Faculty are invited, not enrolled",
  which states that membership is by invitation, that faculty record media,
  lead CEO Round Table sessions, teach Academy cohorts and speak at
  conferences, and that applications are not accepted. The Working with
  page's route is reframed the same way: a colleague's recommendation, never
  self-nomination.
- **Credentials follow the name** on faculty cards and executive rows,
  formatted as "Doug Flora MD, LSSB".

### Open

- **"Physician-led" is unchanged**, pending Ab and others. It appears in the
  "Who we are" heading, the footer descriptor, and the Company page meta
  description. If it goes, a replacement that keeps the substance without the
  label is "A media and education company built for cancer care, led by the
  clinicians and operators inside it."
- **The word "nomination" is kept** because it is in the approved closing
  line, "For sponsorship, faculty nominations, speaking, and press." Only the
  concept changed. If the word itself should go, it appears in four places on
  the Working with page.
- **Executive team details are placeholders.** Doug Flora's credentials come
  from Karen's example and Karen's own title from the source document.
  Surnames and credentials are needed for Lekan and Sanjay, titles for
  everyone but Karen, and the fifth person is an unfilled slot.
- **The male/female mix requirement binds on the executive team section.**
  Section 5 of the source document requires a proper mix anywhere more than
  two people appear together. Five names appear here.
- **Sean or CJ must review** the compliance and disclosure language, and scan
  all site copy for issues, before launch. This replaces the earlier note
  naming Andrea and Jordan for the "How we work" section.

## Review round three — faculty page

Nominations are gone from the faculty page entirely, and the page has been
scrubbed of anything that read as a speakers bureau.

- **The "Faculty are invited, not enrolled" section is deleted.** Reframing
  nomination was not enough; the concept is off the page. The page now closes
  on the disclosure statement, which is the institutional close rather than a
  call to join.
- **The role chips are gone.** Every card carried "Hosts / Teaches / Speaks /
  Advises", which is an availability menu attached to a face — the single
  most bureau-like element on the page. Cards now read portrait, name and
  credentials, area of expertise, institution: an editorial board, not a
  roster for hire. The unused `.roles` styling was removed with them.
- **"Who hosts, teaches, speaks, and leads sessions"** became "National
  oncology leaders, by area of expertise".
- **The standfirst** no longer lists services. Faculty "shape what we
  publish, teach, and convene", which uses the source document's own three
  verbs for the company.
- **"Everyone in the coalition is reachable through the filter"** is gone;
  "reachable" read like booking. The intro now leads with authority: faculty
  set the direction of what is published and lead the programs.

Three sections remain: hero, the coalition, disclosure.

### Company page brought into line

Both places on the Company page that carried the old framing were changed to
match. Each edits approved source-document copy, so each is listed here to be
easy to restore:

- **The faculty block** said faculty "host, teach, speak, and advise across
  everything above." It now says they "set the direction of everything
  above", mirroring the faculty page's own line and keeping the tie back to
  the three blocks preceding it.
- **The closing line** said "For sponsorship, faculty nominations, speaking,
  and press, one inbox reaches the team." It now reads "For sponsorship,
  speaking, and press, one inbox reaches the team." The faculty page no
  longer offers a nomination route, so the Company page no longer advertises
  one. "Speaking" is kept because it refers to conference programming rather
  than faculty availability.

### Still open: the Working with page

It remains the only page offering a faculty nomination route, now framed as a
colleague's recommendation, and its closing line still reads "For
sponsorship, faculty nominations, speaking, and press." Removing the route
takes that page from four routes to three, which the hero and section heading
both state.

## Review round four — Explore renamed and the blocks resplit

Content became **AI Academy** and Programs became **Perspectives**, in the
primary nav and the footer Explore column on all three pages. Destinations
follow: `/academy` and `/perspectives`.

The Company page's four capability blocks were resplit to match, dividing
editorial from education:

| Block | Holds | Link |
| --- | --- | --- |
| AI Academy | Course library, cohorts | `/academy` |
| Perspectives | Podcast, video series, newsletter | `/perspectives` |
| Events | SHIFT and the CEO Round Table | `/events` |
| Faculty | Unchanged | `/faculty` |

The CEO Round Table moved into Events, which now covers both convenings, and
carries the Round Table's two figures alongside SHIFT's.

The section heading changed from "Owned content, programs, events, and the
people behind them" to "The Academy, Perspectives, events, and the people
behind them".

### Two things to confirm

- **Block order follows the nav order requested** — AI Academy first,
  Perspectives second. The option preview showed Perspectives first. Flipping
  both is a two-line change.
- **The AI Academy figures are new.** "Courses in the library" and "Teams
  through the Academy" are not in the source document's figure list, which
  covers episodes, subscribers, Round Table membership, institutions, SHIFT
  attendees and speakers, faculty headcount and specialties. They are
  placeholders like the rest and can be dropped without disturbing the row.

A layout bug came with the resplit and is fixed: the figures column used a
non-wrapping row below 900px, which was fine for two figures and overflowed
the page by 93px once Events carried four. It now wraps.
