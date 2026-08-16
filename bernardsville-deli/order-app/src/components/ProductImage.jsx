import { Show } from 'solid-js';
import RenaissanceMedia from '../art/RenaissanceMedia';
import { getItemVariant } from '../data/images';

export default function ProductImage(props) {
  const item = () => props.item;
  const localPhoto = () => item()?.photo;

  return (
    <Show
      when={localPhoto()}
      fallback={
        <RenaissanceMedia
          class="product-art ren-media--card"
          source="blend"
          variant={getItemVariant(item())}
          type="food"
          frame="octagon"
          geometry="rose"
          label={item()?.name}
        />
      }
    >
      <img
        class="product-photo"
        src={localPhoto()}
        alt={item()?.name ?? ''}
        width="640"
        height="480"
        loading="lazy"
        decoding="async"
      />
    </Show>
  );
}
