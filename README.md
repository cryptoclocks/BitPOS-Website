# BitPOS Website

Product website for BitPOS and BitPOS Mini, hosted independently from the merchant and customer applications.

- Domain: https://bitpos.cashlessthailand.com
- Merchant POS: https://pos.cashlessthailand.com
- Customer checkout: https://pay.cashlessthailand.com

## Run

`npm run dev` serves `public/` at http://localhost:8891. `npm run build` creates `dist/`.

Static output with a locally bundled Three.js viewer. Native JavaScript drives the scroll-scrubbed Blender sequence, rotatable STL-derived Mini model, automatically cycling screen textures, in-page video playback, bilingual copy, benefit counters and motion controls. Build dependencies are pinned in package-lock.json. Videos load near the viewport, autoplay muted when visible and pause offscreen; sound requires a click. Reduced-motion preferences disable automatic playback and screen cycling. A poster remains if WebGL is unavailable. YouTube remains an optional full-video link/modal.

The benefit figures are illustrative pilot targets, not measured business results. No external model/CDN runtime is required. Run `npm ci` before building a fresh checkout.

## Deploy

Import this repository in Vercel, use Other framework, build `npm run build`, output `dist`. Add the custom domain and use the DNS record supplied by that project's Vercel domain settings. Do not change existing `pos`, `pay` or `guide` records.

## Claims and assets

The existing café trial uses test USDG on Solana devnet. AI promotions, NFT loyalty, pickup alerts and additional stablecoins are presented as development roadmap, not completed features. The website does not connect wallets or handle payment keys.

`public/assets/asset-sources.json` records reused assets. Product renders/lifestyle/collectibles are illustrations; the café trial section uses actual trial media. Existing BitPOS wordmark, Blender renders and footage are supplied by the project owner. Font licenses are included next to font files. Project-owned source is Apache-2.0; brands, fonts and media retain their respective rights.
