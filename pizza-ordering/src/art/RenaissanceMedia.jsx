import { createSignal, splitProps, Show } from 'solid-js';
import FrescoArt from './FrescoArt';
import RenaissanceGeometry from './RenaissanceGeometry';
import {
  getPhotoUrl,
  getStoryPhotoUrl,
  getFoodPhotoUrl,
  getCategoryPhotoUrl,
} from '../data/photos';
import { getStoryVariant } from '../data/images';

/**
 * Unified media: Fresco SVG art, styled photography, or layered blend —
 * all sharing geometric Renaissance framing and warm fresco treatment.
 *
 * source: 'art' | 'photo' | 'blend'
 */
export default function RenaissanceMedia(props) {
  const [local] = splitProps(props, [
    'source',
    'variant',
    'type',
    'frame',
    'class',
    'label',
    'scene',
    'geometry',
    'photoGroup',
    'storyId',
  ]);

  const [errored, setErrored] = createSignal(false);

  const source = () => local.source ?? 'art';
  const geometry = () => local.geometry ?? 'rose';
  const frame = () => local.frame ?? 'none';

  const photoSrc = () => {
    if (local.storyId) return getStoryPhotoUrl(local.storyId);
    const group = local.photoGroup ?? inferPhotoGroup(local.type);
    const key = local.variant;
    if (group === 'story') return getPhotoUrl(key, 'story');
    if (group === 'category') return getCategoryPhotoUrl(key);
    if (group === 'scene') return getPhotoUrl(key, 'scene');
    if (group === 'deal') return getPhotoUrl(key, 'deal');
    if (group === 'food') return getFoodPhotoUrl(key);
    return getPhotoUrl(key, group);
  };

  const frameClass = () => {
    const f = frame();
    if (f === 'none') return '';
    return `fresco-frame fresco-frame--${f}`;
  };

  const rootClass = () =>
    [
      'ren-media',
      `ren-media--${source()}`,
      frameClass(),
      local.class ?? '',
    ]
      .filter(Boolean)
      .join(' ');

  const showPhoto = () =>
    !errored() && (source() === 'photo' || source() === 'blend');

  const showArt = () =>
    source() === 'art' || (source() === 'blend' && !errored());

  const artType = () => local.type ?? 'food';
  const artVariant = () => {
    if (local.storyId) return getStoryVariant(local.storyId);
    return local.variant;
  };

  return (
    <div
      class={rootClass()}
      role={local.label ? 'img' : 'presentation'}
      aria-label={local.label}
    >
      <Show when={showPhoto()}>
        <img
          class="ren-media__photo"
          src={photoSrc()}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setErrored(true)}
        />
        <div class="ren-media__wash" aria-hidden="true" />
        <div class="ren-media__vignette" aria-hidden="true" />
        <div class={`ren-media__geometry ren-media__geometry--${geometry()}`} aria-hidden="true">
          <RenaissanceGeometry variant={geometry()} />
        </div>
      </Show>

      <Show when={showArt()}>
        <div
          class="ren-media__art"
          classList={{ 'ren-media__art--overlay': source() === 'blend' }}
        >
          <FrescoArt
            variant={artVariant()}
            type={artType()}
            scene={local.scene}
            label={local.label}
          />
        </div>
      </Show>

      <div class="ren-media__grain" aria-hidden="true" />
      <div class="ren-media__border" aria-hidden="true" />
    </div>
  );
}

function inferPhotoGroup(type) {
  if (type === 'scene') return 'scene';
  if (type === 'story') return 'story';
  if (type === 'category') return 'category';
  if (type === 'deal') return 'deal';
  return 'food';
}
