import { createSignal, splitProps } from 'solid-js';
import { DEFAULT_FOOD_IMAGE } from '../data/images';

export default function UiImage(props) {
  const [local, rest] = splitProps(props, [
    'src',
    'alt',
    'class',
    'fallback',
    'loading',
  ]);
  const fallback = () => local.fallback ?? DEFAULT_FOOD_IMAGE;
  const [errored, setErrored] = createSignal(false);
  const resolvedSrc = () => (errored() ? fallback() : local.src);

  return (
    <img
      {...rest}
      class={local.class}
      src={resolvedSrc()}
      alt={local.alt ?? ''}
      loading={local.loading ?? 'lazy'}
      decoding="async"
      onError={() => setErrored(true)}
    />
  );
}
