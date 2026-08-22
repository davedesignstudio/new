const wrap = (inner) =>
  `<svg class="pillar__icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

// Capitol dome over a colonnade.
export const legislativeIcon = wrap(`
  <path d="M32 6v5" />
  <path d="M20 26a12 12 0 0 1 24 0" />
  <path d="M14 32h36" />
  <path d="M8 40h48" />
  <path d="M12 56h40" />
  <path d="M18 40v16M26 40v16M38 40v16M46 40v16" />
  <path d="M24 32l8-6 8 6" />
`);

// Portico of the White House.
export const executiveIcon = wrap(`
  <path d="M6 26 32 10l26 16" />
  <path d="M11 26h42" />
  <path d="M8 56h48" />
  <path d="M16 26v30M24 26v30M40 26v30M48 26v30" />
  <path d="M28 56V42h8v14" />
  <path d="M32 10V4" />
`);

// Scales of justice.
export const judicialIcon = wrap(`
  <path d="M32 12v40" />
  <path d="M32 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
  <path d="M14 20h36" />
  <path d="M20 56h24" />
  <path d="M14 20 7 36h14z" />
  <path d="M50 20l-7 16h14z" />
  <path d="M7 36a7 7 0 0 0 14 0" />
  <path d="M43 36a7 7 0 0 0 14 0" />
`);

export const ICONS = {
  legislative: legislativeIcon,
  executive: executiveIcon,
  judicial: judicialIcon
};
