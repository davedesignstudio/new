# WIDER

A playable comic about Earth: a roadside teller, a kitchen that tried to be a fortress, hungry guests in a van, and a table that does not end.

**The game is Earth. Earth does not end.**

Live doors:

- `/story` — the one plot
- `/play/?b1=1` — Path B1, the storm (Tower → Star)
- `/play` — name the guests, then walk
- `/road` — Road-Wisdom, the tiny Game Boy loop

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

`npm test` checks product copy for leftover space-tour language and walks a full Road-Wisdom cycle in Node (title → fortune → walk again, mill memory, princess easter egg, persistence).
