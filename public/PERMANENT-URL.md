# Permanent gallery URL

**Target permanent URL:** https://davedesignstudio.github.io/new/history-100/

The full studio static site (including the 100-logo gallery) is published on the `gh-pages` branch.

## One-time enable (required)

GitHub Pages is not enabled on this repo yet (API token cannot turn it on). Enable it once:

1. Open https://github.com/davedesignstudio/new/settings/pages
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**
3. Branch: **gh-pages** / **/** (root) → **Save**

After ~1 minute the permanent URLs work:

- Gallery: https://davedesignstudio.github.io/new/history-100/
- Site: https://davedesignstudio.github.io/new/

Optional: switch Source to **GitHub Actions** so `.github/workflows/deploy-github-pages.yml` redeploys on push.

## Service the Hills subdomain

**Path (works now):** https://dphilhowerstudio.com/sthills/  
**Intended subdomain:** https://sthills.dphilhowerstudio.com/

### DNS (one-time)

1. Add a CNAME record: `sthills` → your Pages / host target (e.g. `davedesignstudio.github.io` or the studio apex host).
2. In the host panel, map `sthills.dphilhowerstudio.com` either to:
   - the contents of `public/sthills/` as document root, **or**
   - a reverse proxy / redirect to `/sthills/` on the parent site.
3. `public/sthills/CNAME` already declares `sthills.dphilhowerstudio.com` for GitHub Pages-style custom domains when that folder is published as a site root.

Until DNS is set, use the `/sthills/` path on the parent studio.
