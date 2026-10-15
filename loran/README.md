# LORAN — website

A working build of the new LORAN site, following *LORAN Branding & Website:
Creative Brief & Proposal* (Laura Teti, 1 Art Lane · Ken Herbert, PixelFuel).
It is static: plain HTML, one stylesheet and one script, with no build step or
dependencies beyond two Google web fonts. To view it, serve the folder:

```
python3 -m http.server 8000   # then open http://localhost:8000
```

## Sitemap (brief, p. 7)

| Page | File |
| --- | --- |
| 0.0 Home | `index.html` |
| 1.0 Events | `events.html` |
| 1.1 Event detail | `event-shift.html` (SHIFT: Oncology Innovation Summit) |
| 2.0 About | `about.html` |
| 3.0 Partner With Us | `partner.html` |
| 4.0 Contact | `contact.html` (preselects a reason via `?type=invitation\|nominate\|partner\|press`) |
| 5.0 Privacy Policy | `privacy.html` (footer only) |

## How it follows the brief

- **Name.** "LORAN" stands alone everywhere. "LORAN Media Group" appears only
  in the footer copyright and the privacy policy (Q9). The navigation backstory
  is one small origin note on About and is not used as positioning.
- **Look (Q10).** It moves off the hot red and the stock-boardroom imagery.
  The palette is a deep, trustworthy navy with an updated, warmer red
  (`#D2483A`) used sparingly, on warm paper rather than clinical white. The
  type pairs Newsreader (display, "NEJM") with Inter (reading and UI, "dinner
  conversation"). The whole palette lives in the `:root` block of
  `styles.css`.
- **Voice (Q6–Q7).** Copy is plain, peer-to-peer, never salesy. Lines come
  from the brief: the positioning, "Who are the 100 people…", "Sponsors are
  in the room. They are never in the agenda.", the values and the reasons to
  believe.
- **One visual idea: the room.** Each graphic is a variation on dots and
  seats. In the home hero, a crowd drifts and 100 of them are drawn into one
  room. The scale section shows 320 dots for a 40,000-person congress against
  the single red dot of a LORAN summit. The format cards, the seat-mix chart
  on the event page and the logo mark all use the same dots.

## Motion

All motion is in `main.js`, with no libraries:

- line-by-line headline reveals
- reveal-on-scroll
- count-up numbers
- quote words that light up as you scroll
- a sticky list of reasons that steps through as you scroll
- strike-through on the "against" list
- bar and dot animations
- a marquee
- a header that hides on scroll
- a circular-wipe mobile menu
- the hero canvas

The canvas pauses when it is off screen. With `prefers-reduced-motion`, every
element renders in its final state.

## Not wired yet (per the proposal's tech plan)

- **Forms** (contact, partner, newsletter) show a success state but send
  nothing. At launch, each one posts to a Resend-backed endpoint; see the
  handler in `main.js`.
- **Event registration** links to the contact form. Swap in the
  Eventbrite/third-party URL per event.
- **Next.js/Tailwind/Vercel.** The proposal builds on Next.js. These pages are
  the design and content reference for that build and port directly into
  components. If you keep them static instead, they deploy to Vercel as they
  are.
- **Fonts** load from Google Fonts. Self-host them for production.

## Needs confirming before launch

- **SHIFT details.** The venue (The Thompson, Austin), the ~100 attendees,
  the attendee mix and the four topics come from the public press release.
  Confirm the exact dates: the brief says Sept 24; the release says Sept
  25–26. The "Who was in the room" proportions are illustrative.
- **Upcoming events.** The regional forum cities, virtual summit dates and
  registration links are needed. They currently read "2027 · Dates to be
  announced".
- **Policy statements.** Confirm that "Providers attend free" and the
  partner gets / never gets lists reflect actual policy.
- **Missing content.** Real event photography, testimonials, team bios and
  sponsor logos (brief, Questions for LORAN #1) have no slots yet. Add them
  once the assets exist.
- **Privacy policy.** It is a draft outline for legal review.
- **Domain.** Pending the brief's question #4.
