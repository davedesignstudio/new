# AGENTS.md

## Cursor Cloud specific instructions

This repo is the **Victor Hugo** boilerplate (a [Hugo](https://gohugo.io) static-site
generator wrapped in a gulp 3 + webpack 4 + BrowserSync pipeline). It produces a static
restaurant site ("Tasty Licks"). There is a single product/service: the local dev site.

### Node version (critical, non-obvious)

You MUST run this project on **Node 8** (`.nvmrc` pins `v8.11.1`). Newer Node will not work:

- The committed `package-lock.json` pins 2018-era transitive deps (`browser-sync@2.24.4`,
  `socket.io@2.0.4`, `engine.io@3.1.5`, `ws@3.3.3`) plus `gulp@3.9.1`, whose old
  `graceful-fs@3`/`natives` internals only work on Node 8.
- Node 10 fails at `internalBinding is not defined`; Node 12+ fails at
  `primordials is not defined` / `Object.fromEntries`.

The Cloud VM defaults to a Node 22 shim at `/exec-daemon/node` that shadows nvm, so you must
explicitly put the Node 8 bin first on PATH in every shell before running npm/gulp:

```bash
export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"
export PATH="$HOME/.nvm/versions/node/v8.11.1/bin:$PATH"
node --version   # -> v8.11.1
```

Node 8's default npm (5.6) has no `npm ci`; the update script upgrades it to npm 6 so
installs are deterministic. Always use `npm ci` (never `npm install`) — a bare
`npm install` under the wrong npm/Node rewrites the lockfile to modern, Node-8-incompatible
versions.

### Commands (run with the Node 8 PATH above)

- Install: `npm ci` (deterministic; handled by the startup update script).
- Dev server: `npm run start` → `gulp server`. Builds the site then serves `./dist` via
  BrowserSync at `http://localhost:3000` (UI at `:3001`). Watches `src/` and `site/` and
  live-reloads on CSS/JS/content changes.
- Build: `npm run build` → outputs static site to `./dist`.
- Lint: `npm run lint` is currently **broken in the repo itself** — there is no ESLint config
  file, so `eslint src` exits with "couldn't find a configuration file". This is a pre-existing
  repo condition, not an environment problem.

### Notes

- Hugo is provided by the `hugo-bin` npm package (Hugo v0.42.1), installed into
  `node_modules/hugo-bin/vendor/hugo`; no system Hugo install is needed.
- `dist/` and `node_modules/` are gitignored and are build/install artifacts.
