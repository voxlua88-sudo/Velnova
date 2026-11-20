# VELNOVA website

A scroll-driven 3D website with an animated molecular network, 360° molecular inspector, company story, product catalogue cards and industries.

## Run it

Open `index.html` in a browser. It needs an internet connection (Three.js, GSAP and the font load from CDNs).

Serve the folder with a local server:

    python3 -m http.server 8000      # then open http://localhost:8000

## Where to change things

| What | File |
| --- | --- |
| Homepage/About content, products, RM prices, quote inbox, WhatsApp number | `js/config/content.js` |
| Colours, spacing, layout | `css/styles.css` |
| Section order and headings | `index.html` |
| About page layout | `about.html` |
| About page content rendering | `js/about-page.js` |
| Molecular 3D scene, scroll animation, inspector | `js/main.js` |
| Cards and product popup | `js/cards.js` |
| Shopping cart storage and product actions | `js/cart.js` |
| Cart page and WhatsApp order message | `cart.html`, `js/cart-page.js` |
| Quote request form, email delivery, and confirmation | `quote.html`, `js/quote.js`, `quote-sent.html` |
| Static-host security headers | `_headers` (Cloudflare Pages or Netlify) |

## Chemistry visual

The hero uses a procedural Three.js molecular network rather than a product package model. The catalogue sections link to the available product categories.

## Notes

- Text in `[square brackets]` is placeholder. Replace it with verified facts. No certifications, specifications or safety claims are made.
- Product prices and the WhatsApp number are configured in `js/config/content.js`. The current RM30 prices were supplied for setup; confirm them and replace the temporary WhatsApp number before launch.
- Orders are not charged online. The cart opens a prefilled WhatsApp message with product quantities and subtotal; VELNOVA confirms availability and any delivery charges.
- Quote requests are submitted to FormSubmit using a standard form POST and return to `quote-sent.html` after success. Confirm `velnovahq@gmail.com` using its one-time activation email before accepting live requests.
- The quote form includes a honeypot; CDN scripts use Subresource Integrity, and `_headers` configures CSP and other security headers on Cloudflare Pages or Netlify. The Python preview server does not apply `_headers`.
- DDoS protection is provided at the hosting/DNS edge, not by website JavaScript. For Cloudflare protection, serve the site through Cloudflare Pages or proxy its custom domain through Cloudflare; then enable the proxy and review its managed WAF/DDoS settings. This repository does not configure a domain or Cloudflare account.
