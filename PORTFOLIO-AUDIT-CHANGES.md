# Portfolio audit changes

## Applied
- Added route-specific metadata for About, Contact, Projects, Skills, and Terminal.
- Improved root metadata, title template, keywords, Open Graph/Twitter descriptions, and robots directives.
- Added `app/sitemap.ts` and `app/robots.ts`; set `NEXT_PUBLIC_SITE_URL` to the real public domain to generate absolute sitemap URLs.
- Replaced the hero's native `<img>` with Next.js `<Image>`, explicit intrinsic dimensions, responsive `sizes`, and priority loading.
- Converted the About portrait and the unused project screenshot to WebP and updated the About image reference.
- Removed the duplicate CSS `margin: 0` and aligned the body font with the configured Geist font.
- Added a primary `<h1>` to each secondary route by promoting the first existing `<h2>` while preserving its classes and content.

## Still requires verification
- `npm ci` timed out in this environment, so lint and production build were not run successfully.
- Run `npm run lint` and `npm run build` locally after extracting the ZIP.
- Set `NEXT_PUBLIC_SITE_URL` to your actual domain in `.env.local` and your deployment provider. Do not use a placeholder domain in production.
- Run Lighthouse against the deployed URL and test navigation, responsive layout, reduced motion, and contact form submission in a real browser.
