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
