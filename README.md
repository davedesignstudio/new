# WIDER

A playable comic about Earth: a roadside teller, a kitchen that tried to be a fortress, hungry guests in a van, and a table that does not end.

**The game is Earth. Earth does not end.**

Dave Design Studio: **We help independent restaurants look as exceptional as the food they serve.** The comic is the long table. The studio is the room.

Live doors:

- `/` and `/story` — the one plot
- `/adventure` — The Paperback (fifty-two numbered sections)
- `/table` — kitchen-table dungeon: Zorya is the DM, you type what you do, each night is rolled on the fly
- `/hidden` — what an endless Earth stores instead of burying
- `/route` — six kitchens from the last bag to the Star-table
- `/road` — Road-Wisdom, the tiny Game Boy loop
- `/play/?b1=1` — Path B1, the storm (Tower → Star)
- `/libraries` — other tellers on story, read not interviewed, applied to this kitchen
- `/history` — palace, prairie, stall: pieces of history told as one supper
- `/keystone` — the stone is not the soup; the old stories agree

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

`npm test` checks product copy for leftover space-tour language, walks a full Road-Wisdom cycle, checks that every Paperback turn lands on a real section, and deals two on-the-fly Table nights.
