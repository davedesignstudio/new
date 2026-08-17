/** Original bobcat pizzaiolo mascot — Sega Genesis / 90s platformer inspired */
export default function RetroMascot(props) {
  const mood = () => props.mood ?? 'idle';
  const size = () => props.size ?? 64;

  return (
    <svg
      class={`retro-mascot retro-mascot--${mood()} ${props.class ?? ''}`}
      width={size()}
      height={size()}
      viewBox="0 0 64 64"
      aria-hidden={props.decorative !== false}
      role={props.label ? 'img' : undefined}
      aria-label={props.label}
    >
      <ellipse cx="32" cy="58" rx="18" ry="4" fill="rgba(0,0,0,0.25)" />
      <path
        d="M52 38 Q62 28 58 18 Q54 24 50 30 Z"
        fill="#D4782A"
        stroke="#3D2914"
        stroke-width="1.5"
      />
      <ellipse cx="32" cy="40" rx="16" ry="14" fill="#E8943A" stroke="#3D2914" stroke-width="2" />
      <ellipse cx="32" cy="42" rx="10" ry="8" fill="#F5C078" />
      <circle cx="32" cy="24" r="14" fill="#E8943A" stroke="#3D2914" stroke-width="2" />
      <polygon points="20,14 16,4 26,10" fill="#E8943A" stroke="#3D2914" stroke-width="1.5" />
      <polygon points="44,14 48,4 38,10" fill="#E8943A" stroke="#3D2914" stroke-width="1.5" />
      <polygon points="21,12 19,6 25,10" fill="#F5C078" />
      <polygon points="43,12 45,6 39,10" fill="#F5C078" />
      <rect x="22" y="6" width="20" height="6" rx="2" fill="#FFF8E0" stroke="#3D2914" stroke-width="1.5" />
      <ellipse cx="32" cy="6" rx="12" ry="5" fill="#FFF8E0" stroke="#3D2914" stroke-width="1.5" />
      <ellipse cx="26" cy="24" rx="5" ry="6" fill="#FFF" stroke="#3D2914" stroke-width="1.5" />
      <ellipse cx="38" cy="24" rx="5" ry="6" fill="#FFF" stroke="#3D2914" stroke-width="1.5" />
      <circle cx="27" cy="25" r="2.5" fill="#1A1A2E" />
      <circle cx="39" cy="25" r="2.5" fill="#1A1A2E" />
      <circle cx="28" cy="24" r="1" fill="#FFF" />
      <circle cx="40" cy="24" r="1" fill="#FFF" />
      <polygon points="32,28 30,31 34,31" fill="#3D2914" />
      <path
        d="M26 33 Q32 38 38 33"
        fill="none"
        stroke="#3D2914"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <line x1="14" y1="28" x2="22" y2="29" stroke="#3D2914" stroke-width="1" />
      <line x1="14" y1="32" x2="22" y2="32" stroke="#3D2914" stroke-width="1" />
      <line x1="42" y1="29" x2="50" y2="28" stroke="#3D2914" stroke-width="1" />
      <line x1="42" y1="32" x2="50" y2="32" stroke="#3D2914" stroke-width="1" />
      {props.holdingPizza && (
        <g>
          <circle cx="48" cy="44" r="8" fill="#C9A227" stroke="#3D2914" stroke-width="1.5" />
          <circle cx="46" cy="42" r="2" fill="#A03020" />
          <circle cx="50" cy="45" r="1.5" fill="#3A6B35" />
        </g>
      )}
    </svg>
  );
}
