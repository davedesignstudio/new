import RenaissanceMedia from '../art/RenaissanceMedia';
import { getItemVariant } from '../data/images';

export default function ProductImage(props) {
  return (
    <RenaissanceMedia
      class="product-art ren-media--card"
      source="blend"
      variant={getItemVariant(props.item)}
      type="food"
      frame="octagon"
      geometry="rose"
      label={props.item.name}
    />
  );
}
