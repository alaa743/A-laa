<div align="center">

# A&rsquo;laa Hany Ibrahim — Portfolio

**Front-End Web Developer** · Archaeological Information Systems @ Cairo University

An animated, fully responsive single-page portfolio built with vanilla HTML, CSS and JavaScript — no frameworks, no build step.

[**View live →**](https://alaa743.github.io/A-laa/)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![No dependencies](https://img.shields.io/badge/dependencies-0-ff4d6d?style=flat-square)

</div>

---

## About

A personal portfolio presenting my background, experience, education and front-end work.
The design uses a dark "wine glass" system — deep burgundy surfaces, frosted-glass cards
and rose/champagne gradient accents — with motion used to guide attention rather than
decorate.

## Features

**Design**
- Dark glassmorphism design system driven entirely by CSS custom properties
- Animated ambient background: drifting gradient orbs + film-grain texture
- Fluid typography with `clamp()` — scales smoothly from 320px to ultrawide
- Fully responsive layout (mobile / tablet / desktop breakpoints)

**Motion**
- Scroll-reveal animations with automatic stagger between sibling elements
- Typewriter effect cycling through roles in the hero
- Count-up statistics and animated language-proficiency bars
- 3D pointer-tilt on the portrait and the featured project card
- Cursor-following glow (desktop pointers only)
- Scroll progress bar, sticky glass navbar and scroll-spy navigation

**Functionality**
- Mobile hamburger menu with `Escape` to close and body-scroll lock
- Contact form with inline validation that composes a `mailto:` message
- One-click copy for email and phone, with toast confirmation
- Downloadable CV
- Smooth anchor scrolling offset for the fixed header

**Quality**
- Accessible: skip link, ARIA labels, semantic landmarks, visible focus rings
- Full `prefers-reduced-motion` support — all animation disabled on request
- Graceful no-JS fallback: content is never left invisible
- SEO and Open Graph meta tags, inline SVG favicon
- Print stylesheet

## Tech stack

| | |
|---|---|
| Markup | Semantic HTML5 |
| Styling | CSS3 — custom properties, Grid, Flexbox, `backdrop-filter`, `clamp()` |
| Behaviour | Vanilla JavaScript (ES5-compatible, IIFE-scoped) |
| APIs | `IntersectionObserver`, `requestAnimationFrame`, Clipboard API |
| Fonts | Outfit, Inter, Great Vibes (Google Fonts) |
| Icons | Font Awesome 6 |

No frameworks, no bundler, no `node_modules` — the site is three files served as-is.

## Project structure

```
A-laa/
├── index.html          # Markup and content
├── style.css           # Design system, layout, animations, responsive rules
├── script.js           # All interactions (single IIFE, no globals)
├── alaa.jpg            # Hero portrait
├── Alaa-Hany-CV.pdf    # Downloadable CV
└── README.md
```

## Running locally

Clone the repository and open it — no install required.

```bash
git clone https://github.com/alaa743/A-laa.git
cd A-laa
```

Opening `index.html` directly works, but a local server is recommended so the
Clipboard API and relative paths behave exactly as they do in production:

```bash
# Python 3
python -m http.server 8000

# or Node
npx serve .
```

Then visit <http://localhost:8000>.

## Customising

Nearly all of the look is controlled by the token block at the top of `style.css`:

```css
:root {
    --bg: #0e0508;        /* page background        */
    --rose: #ff4d6d;      /* primary accent         */
    --rose-soft: #ffb3c1; /* secondary accent       */
    --gold: #e8c39e;      /* gradient highlight     */
    --grad-brand: linear-gradient(120deg, #ff4d6d, #ff8fa3, #e8c39e);
}
```

Change those values and the entire palette — buttons, badges, bars, glows and
gradients — follows.

The rotating hero titles live in `script.js`:

```js
var roles = [
    'Front-End Web Developer',
    'HTML • CSS • JavaScript',
    'UI/UX Enthusiast',
    'AIS Student @ Cairo University'
];
```

## Deployment

Hosted on **GitHub Pages**. Pushing to `main` publishes automatically:
`Settings → Pages → Source: main / root`.

## Browser support

Works in all modern browsers (Chrome, Edge, Firefox, Safari). Older browsers
without `IntersectionObserver` still receive the complete content — animations
simply resolve to their finished state.

## Contact

- **Email** — [alaahany894@gmail.com](mailto:alaahany894@gmail.com)
- **Phone** — [+20 101 213 0809](tel:+201012130809)
- **LinkedIn** — [alaa-hany](https://www.linkedin.com/in/alaa-hany-73a61a338/)
- **GitHub** — [@alaa743](https://github.com/alaa743)
- **Location** — 15 May City, Cairo, Egypt

---

<div align="center">

Built with passion &amp; code by <strong>A&rsquo;laa Hany Ibrahim</strong>

</div>
