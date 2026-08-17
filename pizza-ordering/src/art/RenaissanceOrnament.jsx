import RenaissanceGeometry from './RenaissanceGeometry';

/**
 * Section-level geometric ornament bands — Cosmatesque friezes, rose windows, mandorla.
 */
export function RenaissanceOrnament(props) {
  const variant = () => props.variant ?? 'frieze';
  const className = () => props.className ?? '';

  return (
    <div class={`renaissance-ornament renaissance-ornament--${variant()} ${className()}`} aria-hidden="true">
      <RenaissanceGeometry variant={variant()} />
    </div>
  );
}
