# VELNOVA website

A scroll-driven 3D website with an animated molecular network, chemical variant configurator, 360° molecular inspector, company story, product catalogue cards and industries.

## Run it

Open `index.html` in a browser. It needs an internet connection (Three.js, GSAP and the font load from CDNs).

Serve the folder with a local server:

    python3 -m http.server 8000      # then open http://localhost:8000

## Where to change things

| What | File |
| --- | --- |
| The chemistry visual: variant colours and names | `js/config/bottle.config.js` |
| Homepage/About content, products, RM prices, quote inbox, WhatsApp number | `js/config/content.js` |
| Colours, spacing, layout | `css/styles.css` |
| Section order and headings | `index.html` |
| About page layout | `about.html` |
| About page content rendering | `js/about-page.js` |
| Molecular 3D scene, scroll animation, inspector | `js/main.js` |
| Cards and product popup | `js/cards.js` |
| Shopping cart storage and product actions | `js/cart.js` |
| Cart page and WhatsApp order message | `cart.html`, `js/cart-page.js` |
| Quote request form and email delivery | `quote.html`, `js/quote.js` |

## Chemistry visual

The hero uses a procedural Three.js molecular network rather than a product package model. Selectable variants recolour the molecular core and atmospheric glow.

## Notes

- Text in `[square brackets]` is placeholder. Replace it with verified facts. No certifications, specifications or safety claims are made.
- Product prices and the WhatsApp number are configured in `js/config/content.js`. The current RM30 prices were supplied for setup; confirm them and replace the temporary WhatsApp number before launch.
- Orders are not charged online. The cart opens a prefilled WhatsApp message with product quantities and subtotal; VELNOVA confirms availability and any delivery charges.
- Quote requests are emailed through FormSubmit. Confirm `velnovahq@gmail.com` using its one-time activation email before accepting live requests.
- Product variant selection updates the molecular colour.
