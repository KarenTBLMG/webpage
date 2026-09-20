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
| `events.html` | Events — SHIFT and sponsorship |
| `home.html` | Homepage concept mockup — separate design system |
| `faculty.html` | Faculty — markup and roster |
| `ceo-round-table.html` | CEO Round Table — markup and copy |
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
- **Executive team, still outstanding.** Four titles are now set: Doug Flora
  CEO, Sanjay CMO, Karen Fecenko-Tacka COO, Andrea Flora CFO. Still needed:
  surnames and credentials for Lekan and Sanjay, credentials for Andrea
  Flora, a title for Lekan, and the sixth row is an unnamed placeholder — the
  fifth person from the original list of "Doug, Lekan, Sanjay, me and you",
  who was never identified. Delete that row if the list is complete at five.
- **Row order is unchanged** and is not by seniority: Doug, Lekan, Sanjay,
  Karen, Andrea. Reordering would mean placing Lekan, whose role is not yet
  known.
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

### The Working with page: resolved in round five

Nomination is gone from that page too, and the page was rewritten in a
marketing register. See below.

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

## Review round five — Working with TensorBlack, rewritten as marketing

Feedback was that the page read as conservative, with too much about what
TensorBlack cannot do and too much on editorial control. Caution now belongs
in discussion and contracting, not on the page.

### What came out

- **The whole "What commercial support does and does not include" section.**
  Two facing columns, half of them prohibitions, placed before the page ever
  said what a sponsor gets. Deleted, along with its `.ledger` styling.
- **"a line that commercial support does not cross"** from the hero
  standfirst, the meta description, and the social description.
- **"We are not a consultancy and we do not resell software. If what you need
  is implementation work, we are the wrong partner, and we will say so
  early."** The most off-putting sentence on the page.
- **"We do not accept applications."** Nomination language is now gone from
  this page as well, which closes the item left open in round three. The
  route is now "Faculty", framed as an introduction rather than an
  application.

### What went in

- **A reach section, placed second**, before any route: the audience in plain
  terms, then six figures — episodes, subscribers, SHIFT attendees, Round
  Table executives, institutions, faculty. A sponsor's first question is who
  they are reaching, so the page answers it first.
- **A new hero**: "Reach the room where oncology decides."
- **Positive framing on every route.** Sponsorship now says we will walk you
  through the production calendar and show you where your category fits,
  which is the same fact the old page stated as a restriction.

### What stayed, deliberately

One short section, "Independence is what makes this audience worth reaching",
keeps three facts: content is developed by faculty and staff, sponsored
placements are labeled, and faculty disclose relevant financial
relationships. It is phrased as a benefit to the sponsor rather than a
limit on them, and it links to the Company page's "How we work" for the full
statement, which is unchanged.

**This is the "compliantly" half of the instruction.** Labeling sponsored
placements is a disclosure obligation, not a stylistic choice, and removing
it from the page that sells sponsorship would be the one edit in this round
that carries real risk. If Sean or CJ want it worded differently, that is a
wording question rather than a question of whether it appears.

## Review round six — the "one inbox" idea removed

It is gone from both pages that carried it.

On **Working with TensorBlack**:

- The hero standfirst ended "One inbox reaches the team." It now ends "Tell
  us what you are planning and we will show you where it fits."
- "Four ways in, one inbox" became "Four ways to work with us".
- The closing section was headed "One inbox reaches the team". It is now
  "Start a conversation", asking what you are planning and which audience you
  want, and promising the calendar in return.
- **The "What happens next" section is deleted.** Two of its three steps
  existed only to explain the single inbox and the internal routing behind
  it. The third, about starting with the production calendar, already appears
  in the sponsorship route. Nothing was lost. The page is five sections.

On the **Company page**, the closing line read "For sponsorship, speaking,
and press, one inbox reaches the team" — the last surviving fragment of the
source document's "one closing statement, one action, one inbox". It now
reads "If you are considering sponsorship, speaking at SHIFT, or covering our
work, we would like to hear from you." The statement and the action remain;
the inbox does not.

## Review round seven — the Round Table corrected, faculty repositioned

### The CEO Round Table was described wrongly

Every version until now, including the source document, said it "brings
cancer program executives together" to compare or share what they are
deploying. That is not what it is. It gives AI and technology companies
expert guidance and insight from oncology leaders as they shape and build new
products.

Corrected in both places it appeared:

- **Company page, Events block:** it now brings AI and technology companies
  together with oncology leaders for expert guidance while a product is still
  being shaped.
- **Working with page:** it is now a route of its own, "Expert guidance and
  insight", placed second, above the inbound faculty route, because it is a
  commercial offering rather than an enquiry.

### The last speakers-bureau positioning is gone

- **The "Speaking and program participation" route is deleted**, replaced by
  the expert guidance route. It was the last piece of bureau framing on the
  site, and an inbound "want to speak?" route also contradicted SHIFT being
  invitation-only.
- **"speaking" is gone from the Working with hero and meta description**, and
  from the Company page's closing line, which invited "speaking at SHIFT" —
  the thing SHIFT does by invitation. It now offers expert guidance instead.
- **"the work that makes them worth hearing"** became "the questions their
  work is answering". Hearing is booking; questions are thought leadership.
- **The faculty route** now says faculty work "sets the direction of what we
  publish and the guidance we give".
- **The Faculty page** intro now names the guidance role: faculty set the
  direction of what is published, lead the programs, and give the guidance
  that reaches the teams building for oncology.

### Two figures may now be mislabeled

The Round Table's figures were written for the old description and are
unchanged: "Executives in the Round Table" and "Institutions represented"
appear on the Company page's Events block and in the Working with page's
reach band. If the Round Table's audience is AI and technology companies
receiving guidance, a figure like "companies advised" may describe it better.
Both are placeholders, so neither is wrong yet.

## Review round eight — disclosure out, the Round Table given a home

### Independence and disclosure removed from the Working with page

That section is deleted. The page is four sections: hero, reach, ways to
partner, get in touch.

**Two related things were kept, and should be killed explicitly if they are
also meant to go.** The Company page's "How we work" section still carries
independence, disclosure and who pays for what — that section was praised in
round two, with Sean or CJ to review it before launch. The Faculty page's
"What faculty disclose" is also still there. Neither was named in this round's
feedback, and both are about faculty integrity rather than commercial caution.
The site-wide footer fine print is also unchanged.

I flagged the sponsored-placement labeling as a disclosure obligation last
round. That flag stands and was overruled for this page; it is recorded here
rather than repeated.

### The CEO Round Table is now its own page

**Recommendation, acted on:** yes, it needs a page. It is the only thing on
the site serving a different audience — AI and technology companies rather
than oncology professionals — and it is an offering rather than a publication.
As one sentence inside an Events block it was invisible and miscast.

`ceo-round-table.html`, five sections:

1. **Hero** — "Build for oncology with oncology in the room."
2. **What it is** — a closed session; technology teams bring a product, a
   roadmap or an open question, and oncology leaders respond directly. The
   argument is timing: most teams hear this after launch, from a customer.
3. **Policy, implementation, and positioning** — the three areas named in the
   feedback, one hairline row each.
4. **Who is in the room** — drawn from faculty, linking to the faculty page.
5. **Get in touch.**

It is discussed in three places now, which is the answer to "where do we need
to discuss it":

- **Its own page**, for depth.
- **A fifth block on the Company page.** It was pulled out of Events, which
  returns to SHIFT alone, and took the Round Table's two figures with it.
  Events and the Round Table are both convenings but they are not the same
  product, and one block cannot carry both.
- **The "Expert guidance and insight" route** on the Working with page, which
  now links through.

### Open

- **All copy on the Round Table page is drafted here**, not supplied. The
  three areas are expanded from the words "policies, implementation and
  positioning"; everything else is written to fit. Every line needs review.
- ~~The page has no home in the navigation~~ — resolved in round nine.
- **The Round Table figures may still be mislabeled** for the corrected
  description, as noted last round.

## Review round nine — CEO Round Table in the navigation

Added to the primary nav and the footer Explore column on all four pages,
placed after Events, since both are convenings and Faculty stays as the
through-line before Company:

> AI Academy · Perspectives · Events · CEO Round Table · Faculty · Company

On its own page it now carries the current-page marker; Company no longer
does.

The masthead holds at every width. The nav is one row down to 540px and wraps
to two below that, growing the masthead from 106px to 136px. That is the
wrapping behaviour the design already relies on instead of a menu button, so
no new breakpoint was needed.

The Working with page is now the only page with no nav entry. It is reachable
from the Company page's closing action and is arguably right as a deeper
page, but it is worth a decision.

## Review round ten — Sanjay and Doug

### 1. The standalone Working with page is deleted

They read it as an advertisement. `working-with.html` is gone, and its
content is folded into the pages that own each conversation:

- **Sponsorship, and the reach figures** → the new Events page.
- **Expert guidance** → already had the CEO Round Table page.
- **The faculty introduction route** → dropped entirely. Faculty is
  invitation-only, so an inbound route contradicted it. Nothing was lost that
  earlier rounds had not already decided.
- **Press** → the Company page's closing, which now routes each conversation
  to where it lives.

Nothing linked to the deleted page, so there are no broken links. Its
published artifact is now superseded and should be ignored.

### 2. Events page added

`events.html`, five sections, and sponsorship contact lives here as asked:
hero, the summit, who is in the room with the audience figures, sponsorship
in three parts, and a sponsorship "get in touch". The nav's Events item now
points at a real page.

### 3. The Company page leads with the positioning

The hero is now the sentence from leadership:

> **The operating system for AI adoption in oncology.**
> Where decisions are informed, where alignment happens, and where the future
> of the field gets shaped — not just discussed.

"Independent answers, in public" and the older "Guiding providers,
innovators, and investors" standfirst are both retired.

A claim that large needs operations under it immediately, so a new second
section, "Informed, aligned, and shaped", ties each clause to something real:
decisions informed by Perspectives and the AI Academy, alignment through
SHIFT and the CEO Round Table, and the future shaped by faculty who are
deciding it rather than commenting on it. The page is eight sections.

## Review round eleven — Doug's comments

### Applied: the rationale behind removing faculty nominations

Nominations were removed from the site in earlier rounds. Doug's note
records *why*, which matters more than the removal itself and should survive
any future pressure to add an inbound route back:

> Faculty nominations intentionally removed from this list — not a route we
> want surfaced here — as we want to be in the driver's seat with invites and
> not telling important people they weren't good enough after they nominate
> themselves.

That is the standing reason. If anyone proposes a "nominate a colleague"
form, this is the answer.

### Not applied: most of this feedback is about a page that is not in this repository

Items 1 through 7 describe a home page with a dark full-bleed hero, a
scattered orange and grey square pattern, email capture above the fold, and
sections for Today's AI News, In-Depth, AI Academy, Podcast, cross-promo,
Company, Programs/Events/People, and Community. It quotes copy including
"Driving smarter cancer care.", "AI is entering cancer care faster than
anyone can evaluate it.", "Navigate this week's oncology and AI headlines",
"Convening oncology through programs", a Subscribe CTA, "LISTEN & WATCH" and
"THE COMPANY" eyebrows, and OncoPulse.

None of that exists here. Verified by search across all four pages:

| Element described | In this repo |
| --- | --- |
| OncoPulse, Today's AI News, In-Depth, Community | absent |
| "Driving smarter cancer care." | absent |
| "AI is entering cancer care faster than anyone can evaluate it." | absent |
| "Convening oncology through programs" | absent |
| Email capture, any form or input | none on any page |
| Dark full-bleed hero | none; the only tinted band is the light `--field` grey |
| Eyebrow labels | every section on every page already carries a rail label |

The four pages here are Company, Events, CEO Round Table, and Faculty.

The likely subject is the **TensorBlack Front Door** artifact, shared into
this session at the very start and never readable — reads return "this
artifact is served to you as a public (non-member) reader."

### Held for when that page arrives

Worth keeping regardless of which page it lands on:

- **"Driving smarter cancer care."** Doug is right that it is the strongest
  sentence available and is wasted in a footer.
- **"AI is entering cancer care faster than the evidence can keep up."**
  Fixes the original, which blamed the reader for not keeping up.
- **"What's proven, what's promising, and what can wait — vetted weekly by
  working oncologists."** Replaces a generic newsletter line with a reason to
  trust the source.
- **"Join the Network"** over "Subscribe".
- **"A clinician-led network — programs, events, and a faculty bench spanning
  the specialties, government affairs, regulation, and infusion."** Drops the
  awkward "convening oncology".
- **"We work with providers, founders, marketers, and investors. All of them
  get the same deal: ask us anything, and get an honest answer from a
  practicing oncologist, whether you're a sponsor or a stranger."**
- **A lower-commitment way to sample content before the email ask.** Doug's
  strongest structural point: people drop at an email wall with nothing
  sampled.
- **Standardize the light/dark rhythm** on a stated rule, and make eyebrow
  labels all-or-nothing.

## Review round twelve — Doug's homepage notes applied

The page Doug reviewed arrived: a concept mockup on its **own design system**,
unrelated to the four pages above. Dark `#0A0A0B` ground, orange `#F45D01`,
Nunito Sans and IBM Plex Mono, a canvas mosaic behind the hero, email
capture, and a light panel for news and the Academy. It is now `home.html`.

It keeps its own stylesheet. It does not use `styles.css`, and it should not
be merged into that system without a decision, because the two are different
brands on the page.

### Applied

| Doug's note | Change |
| --- | --- |
| Headline blames the reader | "faster than anyone can evaluate it" → **"faster than the evidence can keep up"** |
| Subhead is generic | → **"What's proven, what's promising, and what can wait — vetted weekly by working oncologists."** |
| "Subscribe" undersells | → **"Join the Network"** |
| "Convening oncology" is awkward | → **"A clinician-led network — programs, events, and a faculty bench spanning the specialties, government affairs, regulation, and infusion."** |
| Footer tagline is the strongest line and is buried | **"Driving smarter cancer care."** promoted above the headline, in mono caps at 13px rather than the footer's 10.5px |
| Eyebrows inconsistent | All five major sections now carry one: **Read · Learn · Listen & watch · The company · Community** |
| No low-commitment way to sample before the email ask | **"Not ready yet? Read this week's issue first →"** under the capture form, jumping to the news section |

Two Round Table and SHIFT cards that were placeholder text now carry the
agreed descriptions from this repo's own pages — including that the Round
Table is guidance **to** AI and technology companies, which an earlier draft
had backwards.

### Open

- **The light/dark rhythm was a question, not an instruction**, so it is
  unchanged. The structure is actually two transitions, not five: dark hero →
  light panel holding news and Academy → dark for everything after. Adding
  eyebrows to the light sections gives both zones the same section grammar,
  which should make the split read as intentional. If it still does not, the
  rule to state is editorial and reference content on light, brand and
  community on dark.
- **"Vetted weekly"** is only true of OncoPulse. The live site says the
  podcast ships every two weeks, and the previous author's notes flag that
  "The Headlines" may not exist as a separate newsletter. Confirm the cadence
  before this goes near a build.
- **Doug's line about who TensorBlack works with** — "providers, founders,
  marketers, and investors … ask us anything, and get an honest answer from a
  practicing oncologist, whether you're a sponsor or a stranger" — is not
  placed. It is strong, but Sanjay asked that partnering not be front and
  centre, so it likely belongs on the partner or contact page rather than the
  homepage.
- The original mockup artifact is untouched, so Doug's comments still line up
  with what he reviewed.

## Review round thirteen — one design system across the site

The four deeper pages are re-skinned onto the homepage's system, and the
navigation is unified across all five.

### The surface changed; the structures did not

`styles.css` keeps every class name. Left rail plus content column, hairline
rows instead of cards, full-width rules between sections, the coverage board,
the roster and the executive list are all unchanged in markup. Only the
tokens moved:

| | Before | Now |
| --- | --- | --- |
| Ground | `#FFFFFF` paper | `#0A0A0B` |
| Primary text | `#000000` | `#FFFFFF` |
| Accent | `#E8A317` amber | `#F45D01` orange |
| Display | Archivo | Avenir Next / Nunito Sans |
| Body | Source Serif 4 | the same sans |
| Labels | Archivo caps | IBM Plex Mono |

**The serif is the real casualty.** The source spec chose Source Serif 4
deliberately — "a publication serif, signals peer-reviewed and edited, which
is the claim the page is making." The homepage has no serif, so keeping it
would have broken the consistency that was asked for. It is one token to put
back if that claim matters more than the match.

The rest was anticipated: the spec said the design "does not depend on the
amber specifically, only on there being exactly one accent."

### The light/dark rule, now stated

This answers the question Doug raised about the homepage. **The light panel
marks the block you filter and scan. Everything else runs dark.**

- Company: the coverage board is light. "How we work" moved back to dark — it
  is a statement, not reference material.
- Faculty: the roster is light. "What faculty disclose" moved to dark.
- Events and CEO Round Table have no filterable block, so they run dark
  throughout.

### Navigation

One bar on all five pages, in the homepage's style: wordmark with the accent
on "tensor", stroke icons, sticky and translucent over the dark ground.

> AI News · Videos · Perspectives · AI Academy · Events · CEO Round Table ·
> Faculty · About

The homepage's five items and the deeper pages' six were different sets, so
this is the union. Content first, then convening, with About last, which
keeps the source document's rule that Company sits in the final position. The
footer is unified too: brand and tagline, Read & watch, Convene.

### Doug's remaining note, placed

His line now opens the Events sponsorship section, which is where commercial
conversations actually start:

> We work with providers, founders, marketers, and investors. All of them get
> the same deal: ask us anything, and get an honest answer from a practicing
> oncologist, whether you're a sponsor or a stranger.

### Two contrast regressions found and fixed

The re-skin introduced them; a check caught them before publishing.

- The small label grey was **3.94:1** on the dark ground, failing AA for the
  10–12px text it drives (rail labels, figure captions, footer headings, step
  numbers). Now `#828082`, **5.05:1**.
- The portrait placeholder label was **2.05:1** on the dimmed tile. Now the
  panel's own grey, **4.84:1**.

Everything else clears AA: body text 7.67:1, the accent 6.04:1, button text
on the accent 5.95:1, and the light panel 16.46:1.

### Open

- **Nav has eight items.** It fits on one row at desktop and wraps below
  1040px. If that is too many, Videos and Perspectives are the candidates to
  merge.
- **"AI News" and "Videos" have no pages yet**, so those two nav links point
  at paths that do not exist.
