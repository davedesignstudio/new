# Three Branches of Government

An interactive, single-page guide to how the U.S. Constitution divides federal power between the
legislative, executive, and judicial branches.

## Sections

- **Pick a branch** — tabbed briefs covering who serves, what each branch may do, where its authority
  stops, and the vesting clause from Article I, II, or III.
- **Checks & balances** — a directed triangle diagram. Select a branch to highlight the checks it
  holds over the other two and read them side by side.
- **How a bill becomes a law** — an eight-step walkthrough, color-coded by whichever branch holds the
  pen at that stage.
- **Six questions** — a short quiz with per-answer explanations and a final score.

## Run it

No build step or dependencies. Serve the folder over HTTP so the ES modules load:

```bash
cd three-branches
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Structure

```
three-branches/
├── index.html
├── css/styles.css
└── js/
    ├── data.js       all civics content: branches, checks, bill steps, quiz
    ├── icons.js      inline SVG marks for each branch
    ├── branches.js   branch tabs and the detail brief
    ├── balance.js    checks-and-balances diagram
    ├── journey.js    bill-to-law stepper
    ├── quiz.js       quiz state machine
    └── main.js       entry point
```

## Notes

- Branch tabs follow the ARIA tabs pattern, including arrow-key navigation.
- Interactive controls are real buttons, so the whole page is keyboard reachable.
- Motion is disabled under `prefers-reduced-motion`.
