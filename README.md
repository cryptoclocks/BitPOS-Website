# BitPOS Website

Product website for BitPOS and BitPOS Mini, hosted independently from the merchant and customer applications.

- Domain: https://bitpos.cashlessthailand.com
- Merchant POS: https://pos.cashlessthailand.com
- Customer checkout: https://pay.cashlessthailand.com

## Run

`npm run dev` serves `public/` at http://localhost:8891. `npm run build` creates `dist/`.

Zero runtime dependencies. Native JavaScript drives the scroll-scrubbed Blender sequence, interactive device previews, video modal, language switch and motion controls. Assets are local; YouTube embeds load only after a video click. Preview sound is opt-in. Reduced-motion preferences are respected.

## Deploy

Import this repository in Vercel, use Other framework, build `npm run build`, output `dist`. Add the custom domain and use the DNS record supplied by that project's Vercel domain settings. Do not change existing `pos`, `pay` or `guide` records.

## Claims and assets

The existing café trial uses test USDG on Solana devnet. AI promotions, NFT loyalty, pickup alerts and additional stablecoins are presented as development roadmap, not completed features. The website does not connect wallets or handle payment keys.

`public/assets/asset-sources.json` records reused assets. Product renders/lifestyle/collectibles are illustrations; the café trial section uses actual trial media. Existing BitPOS wordmark, Blender renders and footage are supplied by the project owner. Font licenses are included next to font files. Project-owned source is Apache-2.0; brands, fonts and media retain their respective rights.
