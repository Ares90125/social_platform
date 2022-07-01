import createCache from '@emotion/cache';

export default function createEmotionCache(): ReturnType<typeof createCache> {
  return createCache({ key: 'css', prepend: true });
}
