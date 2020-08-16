const numberKeys = [
  'width',
  'height',
  'commentCount',
  'source_repeat',
  'submitted_by',
];

const nominators = noms => {
  if (noms === '' || noms == null) {
    return null;
  }

  if (typeof noms === 'string') {
    return Number(noms);
  }

  if (typeof noms === 'object') {
    const key = Object.keys(noms)[0];

    if (!key) {
      return null;
    }

    return key.replace('wordpress_', '');
  }

  return noms;
};

module.exports = ({ entities }) =>
  entities.map(entity => {
    const cleanup = (target, key) => {
      if (target == null) {
        return null;
      }

      if (numberKeys.includes(key)) {
        return !target ? null : Number(target);
      }

      switch (key) {
        case '@type':
          return typeof target === 'string' ? [target] : target;
        case 'nominators':
          return nominators(target);
        case 'smush':
          return target === 'Not processed' ? null : target;
        case 'yoast_meta':
          return target.map(meta => {
            let content = meta.content;

            if (!content) {
              const media = entities.find(
                entity =>
                  entity.__type === 'wordpress__wp_media' &&
                  meta.content___NODE === entity.id
              );

              if (media) {
                content = media.source_url;
              } else {
                console.warn(`No media found for ${JSON.stringify(meta)}`);
                content = '';
              }
            }

            return {
              name: meta.name,
              property: meta.property,
              content,
            };
          });
        default:
          if (Array.isArray(target)) {
            return target.map((val, i) => cleanup(val, `${key}[${i}]`));
          }

          if (typeof target === 'object') {
            const ret = {};

            for (const [key, value] of Object.entries(target)) {
              if (key === 'image_meta') {
                continue;
              }

              const newKey =
                key !== 'wordpress_id' ? key.replace('wordpress_', '') : key;
              ret[newKey] = cleanup(value, newKey);
            }

            if (key.includes('yoast_json_ld')) {
              return JSON.stringify(ret);
            }

            return ret;
          }

          return target;
      }
    };

    return cleanup(entity, 'entity');
  });
