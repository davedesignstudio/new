# WIDER

A playable comic about Earth: a roadside teller, a kitchen that tried to be a fortress, hungry guests in a van, and a table that does not end.

**The game is Earth. Earth does not end.**

Live doors:

- `/` and `/story` — the one plot
- `/adventure` — The Paperback (fifty-one numbered sections)
- `/hidden` — what an endless Earth stores instead of burying
- `/route` — six kitchens from the last bag to the Star-table
- `/road` — Road-Wisdom, the tiny Game Boy loop
- `/play/?b1=1` — Path B1, the storm (Tower → Star)
- `/libraries` — other tellers on story, read not interviewed, applied to this kitchen

## Run locally

Node **8.11.1** (Gulp 3 will not run on modern Node):

```bash
nvm use 8.11.1
npm install
npm test
npm run start
```

Then open http://localhost:3000/

To rebuild without the watcher:

```bash
npx gulp css js hugo images
```

## Tests

`npm test` checks product copy for leftover space-tour language, walks a full Road-Wisdom cycle, and checks that every Paperback turn lands on a real section.
