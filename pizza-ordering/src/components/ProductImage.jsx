import UiImage from './UiImage';
import { getItemImage } from '../data/images';

export default function ProductImage(props) {
  return (
    <UiImage
      class="product-photo"
      src={getItemImage(props.item)}
      alt={props.item.name}
    />
  );
}
