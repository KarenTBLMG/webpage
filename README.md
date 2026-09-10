# webpage

A static, single-page site for **TensorBlack**. No build step, no dependencies —
open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

## Files

| File | Purpose |
| --- | --- |
| `index.html` | All markup and page copy |
| `styles.css` | Design tokens and every style rule |
| `main.js` | Progressive enhancement: sticky header, mobile menu, scroll reveal |

## Re-skinning

Every colour, radius, shadow and spacing value is a custom property declared in
the `:root` block at the top of `styles.css`. Changing that one block re-skins
the whole site; no rule below it hard-codes a colour.

The accent is currently a warm clay (`--accent: #D97757`) against a near-black
page (`--bg: #08080A`).

## Notes

- The page renders fully without JavaScript. `main.js` only adds motion and the
  mobile menu.
- `prefers-reduced-motion` is respected: the lattice animation, scroll reveals
  and smooth scrolling all switch off.
- Layout is tested from 320px up; only the code block scrolls horizontally.
