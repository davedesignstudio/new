import { splitProps } from 'solid-js';
import { renderArt, renderScene } from './illustrations';
import { foodVariant, categoryVariant, storyVariant } from './tokens';

export default function FrescoArt(props) {
  const [local] = splitProps(props, [
    'variant',
    'type',
    'class',
    'scene',
    'label',
  ]);

  const resolveVariant = () => {
    if (local.type === 'category') return categoryVariant(local.variant);
    if (local.type === 'story') return storyVariant(local.variant);
    if (local.type === 'deal') return local.variant;
    if (local.type === 'scene') return local.variant;
    return foodVariant(local.variant);
  };

  const svg = () => {
    const v = resolveVariant();
    if (local.scene || local.type === 'scene' || local.type === 'story') {
      const sceneVariants = ['hero-forno', 'footer-napoli', 'tribunali'];
      if (sceneVariants.includes(v) || local.scene) return renderScene(v);
    }
    return renderArt(v);
  };

  return (
    <div
      class={`fresco-art ${local.class ?? ''}`}
      role={local.label ? 'img' : 'presentation'}
      aria-label={local.label}
      innerHTML={svg()}
    />
  );
}
