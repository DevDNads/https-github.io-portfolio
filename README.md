# Daniel Nadal — Quiet Systems Portfolio

A single-page student portfolio for **Daniel Angelo C. Nadal**, BS Information
Technology (Saint Dominic College of Asia, 2023–2026).

**Quiet Systems** is a design concept, not a registered business. It names the
principle the page is built around: technology should reduce friction rather than
relocate it. Everything factual on the page — education, certifications, course
completions, experience, contact details — comes from `Reference/` and is linked
to its supporting evidence. Sections without evidence state that they are pending.

---

## 1. Folder structure

```text
portfolio/
├── index.html                     All page content and structure
├── styles.css                     Design system, layout, motion, themes, responsiveness
├── script.js                      Theme switching and mobile navigation (~100 lines)
├── README.md                      This document
├── Reference/                     Source evidence (certificate PDFs, résumé, portrait)
└── assets/
    ├── portrait-hero.jpg          Optimised 1000px portrait
    ├── Daniel-Nadal-Resume.pdf    Downloadable résumé
    ├── certs/                     Certificate PDFs linked from the page
    │   ├── Certiport-Databases.pdf
    │   ├── Certiport-HTML-CSS.pdf
    │   ├── Certiport-AI-Specialist.pdf
    │   ├── Microsoft-PowerPoint-2019.pdf
    │   ├── Microsoft-Word-2019.pdf
    │   ├── Cisco-IoT-Digital-Transformation.pdf
    │   ├── Cisco-Packet-Tracer.pdf
    │   └── Oracle-Java-Foundations.pdf
    └── fonts/
        ├── BricolageGrotesque-Variable.woff2
        ├── InstrumentSerif-Italic.woff2
        └── Manrope-Variable.woff2
```

No build step, framework, package install, or dependency is required.

## 2. Run it

Open `index.html` directly, or serve the folder:

```bash
cd portfolio
python -m http.server 8000
# http://localhost:8000
```

Use the server if you want the certificate PDFs to open predictably in every
browser. The site targets current Chrome, Edge, Safari, and Firefox.

---

## 3. Content map (Midterm requirements)

The page reads top to bottom in this order, which mirrors the required contents.

| Requirement | Section | What it contains |
| --- | --- | --- |
| Academic progress | 01 Academic profile | Degree, school, years, coursework, four at-a-glance figures |
| Technical skills | 02 Technical expertise | Support, data, front-end, and product capability, plus a skill matrix |
| Projects | 03 Projects | Featured IoT project, capstone status, third-year coursework |
| Professional experience | 04 Experience | Teleperformance and GoodHands roles |
| Certifications | 05 Credentials | Five certifications with issuer, date, and PDF link |
| Course completions | 05 Credentials | Cisco Networking Academy and Oracle Academy, with certificate links |
| Achievements | 06 Recognition | Verified credential and project-leadership milestones |
| Competitions & awards | 06 Recognition | Explicitly marked pending — see §6 |
| Leadership | 07 Leadership | IoT project management role; officership pending — see §6 |
| Contact | 08 Contact | Email, phone, location, résumé download |

### Verified certifications

| Certification | Issuer | Date | Evidence |
| --- | --- | --- | --- |
| IT Specialist — Databases | Certiport | May 7, 2025 | `assets/certs/Certiport-Databases.pdf` |
| IT Specialist — HTML & CSS | Certiport | Feb 4, 2026 | `assets/certs/Certiport-HTML-CSS.pdf` |
| IT Specialist — Artificial Intelligence | Certiport | Jun 3, 2026 | `assets/certs/Certiport-AI-Specialist.pdf` |
| MOS — PowerPoint 2019 Associate | Microsoft | May 30, 2024 | `assets/certs/Microsoft-PowerPoint-2019.pdf` |
| MOS — Word 2019 Associate | Microsoft | Mar 12, 2024 | `assets/certs/Microsoft-Word-2019.pdf` |

### Verified course completions

| Course | Provider | Date | Evidence |
| --- | --- | --- | --- |
| Introduction to IoT and Digital Transformation | Cisco Networking Academy (via SDCA) | Feb 23, 2026 | `assets/certs/Cisco-IoT-Digital-Transformation.pdf` |
| Getting Started with Cisco Packet Tracer | Cisco Networking Academy (via SDCA) | Feb 6, 2026 | `assets/certs/Cisco-Packet-Tracer.pdf` |
| Java Foundations | Oracle Academy | Dec 29, 2024 | `assets/certs/Oracle-Java-Foundations.pdf` |

### IoT project

**AI-Integrated IoT Smart Plate for Food Weight Recognition and Portion
Optimization.** An ESP32-and-load-cell plate that measures food weight and
synchronises it with a web application so portion tracking needs no manual entry.
The page documents the description, objectives, full component and technology
list, Daniel's role (Project Manager / UI-UX), a proposed four-stage
architecture diagram, and the current prototype status.

---

## 4. Feature breakdown

### 4.1 One continuous colour field

**Theory.** Colour-field painting gives a single hue room to change its mind.
Instead of stacking separate section panels, the page treats colour as one
material that warms, cools, and darkens. The visitor travels through one
atmosphere rather than clicking between screens.

**Practice.** A single multi-stop `linear-gradient` is set on `body` and runs the
full document height, so section boundaries have no background of their own to
stitch together. The contact section adds a transparent-to-near-black overlay
that begins as nothing and ends in dusk.

```css
body {
  background-image: linear-gradient(
    180deg,
    #f5ede1 0%,   /* paper */
    #f8e2d1 10%,  /* morning peach */
    #e6e1ef 34%,  /* lilac */
    #d8e1ee 46%,  /* daylight blue */
    #bac5de 70%,
    #aab2d0 80%,
    #7e82a8 100%
  );
}
```

### 4.2 Fixed colour blooms

**Theory.** Atmosphere should come from light moving behind the content, not from
decoration placed on top of it. Soft, out-of-focus colour suggests a physical
space without adding visual noise.

**Practice.** Four fixed, oversized circles use `radial-gradient` in peach,
lilac, sky, and jade. Each has its own `drift-*` keyframe and a different
duration (26–38 s) so combinations never visibly repeat. Because each bloom is a
gradient rather than a blurred image, there is no image cost.

### 4.3 Travelling daylight

**Theory.** The reference is daylight crossing stone over an afternoon. A light
source that advances with reading position makes scrolling feel like time
passing.

**Practice.** A fixed soft-light layer is translated down the viewport with a
pure CSS scroll-driven animation:

```css
@supports (animation-timeline: scroll()) {
  .atmosphere__light {
    animation: daylight-travel linear both;
    animation-timeline: scroll(root block);
  }
}
@keyframes daylight-travel {
  from { transform: translate3d(0, -14vh, 0); }
  to   { transform: translate3d(0, 86vh, 0); }
}
```

If the browser lacks scroll timelines the block is skipped and the light simply
stays put. Content is unaffected.

### 4.4 No scroll-progress line

The earlier build drew a two-pixel gradient line across the top of the viewport.
It read as a UI overlay rather than part of the atmosphere, so it has been removed
entirely — not hidden, not made transparent. There is no progress element left in
the HTML or CSS. Scroll feedback comes only from the travelling daylight and the
section reveals.

### 4.5 Typography system

| Role | Typeface | Use |
| --- | --- | --- |
| Display | Bricolage Grotesque | Hero, section headings, names, email |
| Accent | Instrument Serif Italic | “made quiet”, “understood”, “lighter” |
| Body | Manrope | Paragraphs, labels, navigation, buttons |

Three locally hosted variable fonts. Display sizes use `clamp()` so they scale
fluidly without breakpoint jumps. `font-variation-settings` adjusts weight and
width, and tight negative letter-spacing gives headlines their editorial
confidence. All three files are preloaded to avoid a flash of fallback type.

### 4.6 Theme switching via the brand mark

**Theory.** A portfolio is read in different lighting, and a colour choice should
feel like turning a lamp rather than opening a settings panel. Making the brand
mark the switch keeps the header free of an extra control.

**Practice.** The brand is a `<button>` carrying `data-theme-toggle`. Clicking it
flips `data-theme` on `<html>` between `light` and `dark`, updates
`aria-pressed`, rewrites a visually hidden action label, and updates the
`theme-color` meta tag. Keeping the brand text as the accessible name (rather
than replacing it with an `aria-label`) means the visible label and the spoken
label still match.

- Before first paint, a tiny inline script in `<head>` reads `localStorage.theme`.
  If nothing is stored it follows `prefers-color-scheme`.
- A stored choice wins from then on and is re-applied on every visit.
- If the OS preference changes and the visitor has never chosen, the page follows
  it live.
- `localStorage` access is wrapped in `try/catch`, so private or restricted
  browsing falls back to the OS preference instead of throwing.
- The dark palette is a genuine re-tone: deeper background gradient, brighter
  accents, adjusted card translucency, and a screen-blended grain. Both themes
  set `color-scheme` so native form and scrollbar colours match.

### 4.7 Waffle navigation on mobile

**Theory.** Removing navigation on a phone removes the map, not just the clutter.
The whole nav should stay reachable behind one obvious affordance.

**Practice.** Below 900 px the horizontal link row and the email button are
hidden and a `<details>` element appears in their place, drawn as a 2×2 waffle of
dots inside a circular button.

- `<details>`/`<summary>` gives open–close behaviour with no JavaScript.
- The panel is a solid `#f6efe5` (light) or `#141324` (dark) surface with no
  backdrop filter, so content underneath never shows through.
- `script.js` only adds the refinements: `aria-expanded` sync on toggle, closing
  after a link is chosen, closing on outside click, and closing on `Escape` with
  focus returned to the summary.
- The waffle dots invert when the panel is open, and the trigger darkens so the
  open state is unambiguous.
- All eight destinations are present: About, Expertise, Projects, Experience,
  Credentials, Recognition, Leadership, Contact.

### 4.8 Hero composition

A two-column grid holds the copy and portrait. The headline is “Technology,
*made quiet.*” — the italic word filled with a dark-to-coral gradient via
`background-clip: text`. The portrait sits in an arch built from asymmetric
`border-radius`, with a translucent frame, warm halo, gradient wash, and an
availability pill. The lede states the practice in plain language: technical
support, database fundamentals, front-end development, clear documentation, and
methodical troubleshooting.

At 980 px and below the grid becomes one column and the portrait moves beneath
the copy. At 520 px the portrait becomes full width and the caption stacks.

### 4.9 Scroll reveals

```css
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .reveal {
      animation: reveal-rise both linear;
      animation-timeline: view();
      animation-range: entry 4% cover 26%;
    }
  }
}
```

The keyframe moves content 18 px upward and fades it in. There is deliberately no
blur, so partially visible text stays legible. Outside the `@supports` block no
animation is declared, so content is always visible by default. The hero uses
ordinary time-based entrance animations with staggered delays.

### 4.10 Project presentation

The featured IoT project uses a two-column layout: narrative, metadata,
objectives, and a technology tag list on the left; a four-stage architecture
diagram on the right (sensing → processing → service → interface). Below it, a
two-column contribution block separates *My contribution* from *Current output*,
so individual work is stated separately from team status — a Midterm requirement.

Capstone and third-year entries use compact cards with a fixed metadata pattern:
role or contribution, stack or tools, and an evidence link. Cards that are
awaiting confirmation use a dashed border and a “Pending” badge, which keeps the
distinction between confirmed and unconfirmed content visible.

### 4.11 Credentials split

Education and certification answer different questions, so they are two related
columns rather than identical cards. The education panel holds the degree,
school, dates, coursework, and résumé download. Beside it, each credential row
shows title, issuer, date, and a `View PDF ↗` link that opens the certificate in a
new tab with `rel="noopener"` and a descriptive `aria-label`.

### 4.12 Recognition and leadership

Recognition lists only what a document can support: the five certifications,
three course completions, and the IoT project-management role. Competitions and
student-organisation officership are shown as dashed “pending” panels rather than
invented entries.

### 4.13 Contact close

The contact section overlays a transparent-to-near-black gradient. Large cream
type, a peach-to-lilac gradient italic, and a wide email link create the close.
The email is a real `mailto:`, the phone number a real `tel:`, and the résumé a
real download. No form is used because there is no backend to receive it.

### 4.14 Responsive layout

| Breakpoint | Change |
| --- | --- |
| 980 px | Two-column blocks collapse; principles become a ruled list; timeline stacks; academic strip and skill matrix reflow to two columns |
| 900 px | Desktop nav and header CTA hide; waffle menu appears; brand descriptor and section notes hide |
| 760 px | Project and leadership grids go single column; achievement rows restack |
| 520 px | Tighter page padding, full-width portrait, single-column academic strip and skill matrix, stacked contact details, full-width credential rows |

Fluid `clamp()` values handle most scaling, so breakpoints only change structure,
never basic readability. `overflow-x: clip` on `html` prevents the oversized
atmosphere blooms from creating a horizontal scrollbar on narrow viewports.

### 4.15 Accessibility

- Semantic `header`, `nav`, `main`, `section`, `article`, `figure`, `ol`, `dl`,
  and `footer` elements.
- A skip link that becomes visible on keyboard focus.
- Visible `:focus-visible` outlines in coral.
- Descriptive image alt text and an `aria-hidden` atmosphere layer.
- The theme toggle exposes `aria-pressed` and a visually hidden label naming the
  *next* state, so the visible brand text remains part of the accessible name.
- The mobile menu syncs `aria-expanded` and supports `Escape`.
- Certificate links name their target and warn that a PDF opens in a new tab.
- `prefers-reduced-motion: reduce` disables entrance animations, scroll reveals,
  drifting blooms, and smooth scrolling.
- Both themes set `color-scheme` for native controls.
- Lighthouse (desktop): **100 Accessibility, 100 Best Practices, 100 SEO**.

### 4.16 Performance

- No framework, CSS library, or external request.
- Three local WOFF2 fonts, preloaded.
- One portrait image, resized to 1000 px and JPEG-compressed.
- All colour, grain, and diagram work is CSS or inline SVG — no decorative
  images.
- JavaScript is a single deferred file used only for theme state and menu
  behaviour; the page is fully readable with it disabled.
- Fixed background layers are promoted only where they actually move.

### 4.17 Browser and print fallbacks

Scroll-driven animation is the only advanced dependency, and it is wrapped in
`@supports`. Chrome and Edge get the travelling light and scroll reveals; Safari
and Firefox without support get the same layout, colour, type, and hover states
without scroll-linked motion.

A `@media print` block hides the atmosphere, grain, navigation, scroll cue, and
menu; removes card backgrounds and shadows; switches to black on white; and
prevents sections from breaking across pages.

---

## 5. Where to customise

| Change | Location |
| --- | --- |
| Name, copy, experience, projects, certifications | `index.html` |
| Colour palette (light) | `:root` custom properties in `styles.css` |
| Colour palette (dark) | `[data-theme="dark"]` block in `styles.css` |
| Page gradient | `body { background-image: ... }` |
| Section spacing | `.section { padding-block: ... }` |
| Maximum width | `--shell` in `:root` |
| Motion speed | `--ease`, `drift-*`, reveal ranges |
| Portrait | Replace `assets/portrait-hero.jpg` and update its `alt` |
| Résumé | Replace `assets/Daniel-Nadal-Resume.pdf` |
| Certificates | Add a PDF to `assets/certs/` and a matching row in the credential list |
| Asset cache busting | Bump `styles.css?v=` / `script.js?v=` in `index.html` after editing either file |
| Theme default | The inline script in `<head>` of `index.html` |

## 6. Content still pending verification

These sections are intentionally incomplete. They are marked on the page rather
than filled with placeholder claims.

1. **Capstone project** — title, description, objectives, technology stack, team
   members, individual role, status, and any screenshots or documentation.
2. **Competitions and awards** — event name, organiser, date, placement, and the
   work submitted, plus certificates, photos, or links.
3. **Student-organisation officership** — organisation, position, academic year,
   and responsibilities, plus documentation if available.
4. **Third-year course projects** — the current entries are derived from verified
   certifications (databases, Packet Tracer, Java) and describe coursework
   evidence. Replace them with the actual course-project titles, briefs, and
   individual contributions when available.
5. **IoT project evidence** — photographs of the hardware, application
   screenshots, and any measured results. The architecture diagram on the page is
   a diagram prepared for the portfolio, not a photograph of the build.

Once the missing details arrive, each pending panel can be replaced with a real
card in the same format as the existing ones, without touching the layout.

## 7. Design intent in one line

A calm, warm, colour-led procession from morning to dusk, where the only
structure is the light and the only decoration is type.
