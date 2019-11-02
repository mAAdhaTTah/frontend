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

const cleanup = (target, key) => {
  if (target == null) {
    return null;
  }

  if (key === '@type') {
    return typeof target === 'string' ? [target] : target;
  }

  if (numberKeys.includes(key)) {
    return !target ? null : Number(target);
  }

  if (key === 'nominators') {
    return nominators(target);
  }

  if (key === 'smush') {
    return target === 'Not processed' ? null : target;
  }

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

    return ret;
  }

  return target;
};

module.exports = ({ entities }) =>
  entities.map(entity => cleanup(entity, 'entity'));
