# VELNOVA website

A scroll-driven 3D website with a fixed chemical container, a liquid colour configurator, a 360° inspector, company story, product catalogue cards and industries.

## Run it

Open `index.html` in a browser. It needs an internet connection (Three.js, GSAP and the font load from CDNs).

If you use your own `.glb` model, browsers block local file loading, so serve the folder instead:

    python3 -m http.server 8000      # then open http://localhost:8000

## Where to change things

| What | File |
| --- | --- |
| The bottle: size, colours, label text, liquid level, liquid colours, your own GLB | `js/config/bottle.config.js` |
| Company story, products, process steps, industries, quote email | `js/config/content.js` |
| Colours, spacing, layout | `css/styles.css` |
| Section order and headings | `index.html` |
| 3D scene, scroll animation, inspector | `js/main.js` |
| Cards and product popup | `js/cards.js` |

## Using your own bottle model

1. Put `bottle.glb` in the `assets/` folder.
2. In `bottle.config.js` set `modelUrl: 'assets/bottle.glb'`.
3. Name the liquid mesh `Liquid` in your 3D software so the colour changer can recolour it. Other parts keep their own materials.
4. Adjust `modelHeight` if the size looks wrong.

## Notes

- Text in `[square brackets]` is placeholder. Replace it with verified facts. No certifications, specifications or safety claims are made.
- Quote buttons open an email to the address in `content.js`. For a real quote system you will need a backend (for example Supabase or a form service).
- Product "View in 3D" sets the bottle colour and label to that product.
