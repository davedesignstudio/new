# The Three Branches of Government

An interactive, single-page civics site explaining the three branches of the
United States government — legislative, executive, and judicial — and the
system of checks and balances between them.

## Features

- Overview cards for each branch (Articles I, II, and III) with key powers and facts
- Interactive checks-and-balances explorer: select a branch to see how it restrains the other two
- Five-question quiz with instant feedback and scoring

## Running locally

The site is plain HTML, CSS, and JavaScript with no build step. Serve the
repository root with any static file server, for example:

```bash
python3 -m http.server 3000
```

Then visit http://localhost:3000/.

## Deploying

`netlify.toml` publishes the repository root as-is, so the site can be
deployed directly to Netlify (or any static host) without a build command.

## License

[MIT](LICENSE)
