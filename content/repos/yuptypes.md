---
description: yuptypes
status: publish
gistId: ''
sync: false
createdAt: '2020-09-18T15:21:04.000Z'
updatedAt: '2020-09-18T15:21:04.000Z'
blobs:
  - filename: yuptypes.js
    code: |-
      export const yuptypes = (schema) => {
        const propTypes = {};
        for (const key in schema.fields) {
          propTypes[key] = function checkYupSchema(
            props,
            propName,
            componentName,
            location,
            propFullName,
            secret
          ) {
            try {
              schema.validateSyncAt(key, props, { strict: true });
              return null;
            } catch (err) {
              return new Error(
                `Invalid ${location} `${propName}` supplied to ${componentName};${err.message.replace(
                  key,
                  ""
                )}`
              );
            }
          };
        }
        return propTypes;
      };
    language: js
commits:
  - committedAt: '2020-09-18T19:21:04.000Z'
    description: yuptypes
    blobs:
      - filename: yuptypes.js
        code: |-
          export const yuptypes = (schema) => {
            const propTypes = {};
            for (const key in schema.fields) {
              propTypes[key] = function checkYupSchema(
                props,
                propName,
                componentName,
                location,
                propFullName,
                secret
              ) {
                try {
                  schema.validateSyncAt(key, props, { strict: true });
                  return null;
                } catch (err) {
                  return new Error(
                    `Invalid ${location} `${propName}` supplied to ${componentName};${err.message.replace(
                      key,
                      ""
                    )}`
                  );
                }
              };
            }
            return propTypes;
          };
        language: js
---

