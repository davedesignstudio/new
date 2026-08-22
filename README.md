# Three Branches of Government

An educational static website that explains how the United States federal government is divided into three co-equal branches — **Legislative**, **Executive**, and **Judicial** — and how the system of **checks and balances** keeps power shared between them.

Built with [Victor Hugo](https://github.com/netlify/victor-hugo), a [Hugo](https://gohugo.io) + [Webpack](https://webpack.js.org) boilerplate, and deployable to [Netlify](https://www.netlify.com).

## What's inside

- **Home** — an overview of the three branches with quick-reference cards.
- **Legislative / Executive / Judicial** — a page for each branch describing who serves in it, what it does, and the powers it holds over the others.
- **Checks & Balances** — how each branch can limit the other two.
- **About** — a short explainer on separation of powers.

## System Requirements

* [git](https://git-scm.com)
* [NodeJS](https://nodejs.org) 8 (see `.nvmrc`) — the Gulp 3 build pipeline is not compatible with newer Node majors.
* [Hugo](https://gohugo.io/overview/installing/) (bundled via `hugo-bin`)

If you use [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm install
nvm use
```

## Usage

Install dependencies and start the local dev server:

```bash
npm install
npm run start
```

Then visit http://localhost:3000/ — BrowserSync reloads CSS and refreshes the page when stylesheets, scripts, or content change.

To build the static output to the `/dist` folder:

```bash
npm run build
```

## Project layout

- `site/` — Hugo content, layouts, and configuration.
  - `content/pages/` — the Markdown for each page.
  - `layouts/` — templates (`index.html`, `_default/single.html`, and partials).
  - `config.toml` — site title, description, and navigation menu.
- `src/` — front-end assets compiled by the build.
  - `css/` — PostCSS stylesheets (`main.css` imports the theme in `imports/`).
  - `js/app.js` — a small script that highlights the active nav link.

## License

[MIT](LICENSE)
