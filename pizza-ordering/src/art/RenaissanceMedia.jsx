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
import { getMuseumRecord, getMuseumRecordForStory, getMuseumAttribution } from '../data/museumArt';

/**
 * Unified media: museum masterpieces, Fresco SVG art, photography, or layered blend —
 * all sharing geometric Renaissance framing and warm fresco treatment.
 *
 * source: 'art' | 'photo' | 'blend' | 'museum' | 'museum-blend'
 * blend / museum-blend prefer open-access museum art when a record exists, then Unsplash.
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

  const artType = () => local.type ?? 'food';
  const artVariant = () => {
    if (local.storyId) return getStoryVariant(local.storyId);
    return local.variant;
  };

  const museumRec = () => {
    if (local.storyId) return getMuseumRecordForStory(local.storyId);
    const v = artVariant();
    return v ? getMuseumRecord(v) : null;
  };

  const prefersMuseum = () =>
    source() === 'museum' ||
    source() === 'museum-blend' ||
    source() === 'blend';

  const unsplashSrc = () => {
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

  const photoSrc = () => {
    const museum = museumRec();
    if (prefersMuseum() && museum?.image) return museum.image;
    return unsplashSrc();
  };

  const usingMuseum = () => Boolean(prefersMuseum() && museumRec()?.image && !errored());

  const ariaLabel = () => {
    if (usingMuseum()) {
      return getMuseumAttribution(artVariant()) ?? local.label;
    }
    return local.label;
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
      usingMuseum() ? 'ren-media--museum' : '',
      frameClass(),
      local.class ?? '',
    ]
      .filter(Boolean)
      .join(' ');

  const isBlendMode = () => source() === 'blend' || source() === 'museum-blend';

  const showPhoto = () =>
    !errored() &&
    (source() === 'photo' || isBlendMode() || source() === 'museum');

  const showArt = () =>
    source() === 'art' || (isBlendMode() && !errored());

  return (
    <div
      class={rootClass()}
      role={ariaLabel() ? 'img' : 'presentation'}
      aria-label={ariaLabel()}
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
          classList={{ 'ren-media__art--overlay': isBlendMode() }}
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
