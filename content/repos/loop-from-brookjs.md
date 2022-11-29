---
description: Removed from brookjs
status: publish
gistId: ''
sync: false
createdAt: '2019-03-08T21:54:11.000Z'
updatedAt: '2019-03-08T22:07:32.000Z'
blobs:
  - filename: loop.js
    code: |-
      const child$s = new WeakMap();

      const getChildStream = (stream$, id) => {
          let childs = child$s.get(stream$);

          if (!childs) {
              child$s.set(stream$, childs = {});
          }

          if (childs[id]) {
              return childs[id];
          }

          return childs[id] = stream$.map(props => props.dict[id]);
      };

      const orderMatches = (prev, next) => prev.order === next.order;
      const id = x => x;

      export default function loop(mapper, callback) {
          if (callback == null) {
              callback = mapper;
              mapper = id;
          }

          return stream$ => {
              const src$ = stream$.map(mapper);

              return src$.skipDuplicates(orderMatches)
                  .map(props => props.order.map(id => callback(getChildStream(src$, id), id)));
          };
      }
    language: js
  - filename: observableOf.js
    code: >-
      import Kefir from 'kefir';

      import * as PropTypes from 'prop-types';


      const spyOn = (s$, validator, propName, componentName, name) => {
          if (s$._alive) {
              const handler = (event) => {
                  if (event.type === 'value') {
                      PropTypes.checkPropTypes(validator, event.value, 'prop', componentName);
                  }
              };
              if (!s$._spyHandlers) {
                  s$._spyHandlers = [];
              }
              s$._spyHandlers.push({ name, handler });
              s$._dispatcher.addSpy(handler);

              if (s$._currentEvent) {
                  handler(s$._currentEvent);
              }
          }
      };


      export default function observableOfValidator(valueValidator, name =
      'observableOf') {
          const validator = function observableOf(props, propName, componentName) {
              const propValue = props[propName];
              if (propValue == null) {
                  return null;
              }

              if (!(propValue instanceof Kefir.Observable)) {
                  return new TypeError(`${componentName}: ${propName} must be an Observable, got "${typeof propValue}"`);
              }

              spyOn(propValue, valueValidator, propName, componentName, name);

              return null;
          };

          validator.isRequired = function andIsRequired(props, propName, componentName) {
              const propValue = props[propName];

              if (!(propValue instanceof Kefir.Observable)) {
                  return new TypeError(`${componentName}: ${propName} must be an Observable, got "${typeof propValue}"`);
              }

              spyOn(propValue, valueValidator, propName, componentName, name);

              return null;
          };

          return wrapValidator(validator, name);
      }


      function wrapValidator(validator, typeName, typeChecker = null) {
          return Object.assign(validator.bind(), {
              typeName,
              typeChecker,
              isRequired: Object.assign(validator.isRequired.bind(), {
                  typeName,
                  typeChecker,
                  typeRequired: true,
              }),
          });
      }
    language: js
commits:
  - committedAt: '2019-03-09T02:55:09.000Z'
    description: Removed from brookjs
    blobs:
      - filename: loop.js
        code: |-
          const child$s = new WeakMap();

          const getChildStream = (stream$, id) => {
              let childs = child$s.get(stream$);

              if (!childs) {
                  child$s.set(stream$, childs = {});
              }

              if (childs[id]) {
                  return childs[id];
              }

              return childs[id] = stream$.map(props => props.dict[id]);
          };

          const orderMatches = (prev, next) => prev.order === next.order;
          const id = x => x;

          export default function loop(mapper, callback) {
              if (callback == null) {
                  callback = mapper;
                  mapper = id;
              }

              return stream$ => {
                  const src$ = stream$.map(mapper);

                  return src$.skipDuplicates(orderMatches)
                      .map(props => props.order.map(id => callback(getChildStream(src$, id), id)));
              };
          }
        language: js
      - filename: observableOf.js
        code: >-
          import Kefir from 'kefir';

          import * as PropTypes from 'prop-types';


          const spyOn = (s$, validator, propName, componentName, name) => {
              if (s$._alive) {
                  const handler = (event) => {
                      if (event.type === 'value') {
                          PropTypes.checkPropTypes(validator, event.value, 'prop', componentName);
                      }
                  };
                  if (!s$._spyHandlers) {
                      s$._spyHandlers = [];
                  }
                  s$._spyHandlers.push({ name, handler });
                  s$._dispatcher.addSpy(handler);

                  if (s$._currentEvent) {
                      handler(s$._currentEvent);
                  }
              }
          };


          export default function observableOfValidator(valueValidator, name =
          'observableOf') {
              const validator = function observableOf(props, propName, componentName) {
                  const propValue = props[propName];
                  if (propValue == null) {
                      return null;
                  }

                  if (!(propValue instanceof Kefir.Observable)) {
                      return new TypeError(`${componentName}: ${propName} must be an Observable, got "${typeof propValue}"`);
                  }

                  spyOn(propValue, valueValidator, propName, componentName, name);

                  return null;
              };

              validator.isRequired = function andIsRequired(props, propName, componentName) {
                  const propValue = props[propName];

                  if (!(propValue instanceof Kefir.Observable)) {
                      return new TypeError(`${componentName}: ${propName} must be an Observable, got "${typeof propValue}"`);
                  }

                  spyOn(propValue, valueValidator, propName, componentName, name);

                  return null;
              };

              return wrapValidator(validator, name);
          }


          function wrapValidator(validator, typeName, typeChecker = null) {
              return Object.assign(validator.bind(), {
                  typeName,
                  typeChecker,
                  isRequired: Object.assign(validator.isRequired.bind(), {
                      typeName,
                      typeChecker,
                      typeRequired: true,
                  }),
              });
          }
        language: js
  - committedAt: '2019-03-09T02:53:56.000Z'
    description: Loop from brookjs
    blobs:
      - filename: loop.js
        code: |-
          const child$s = new WeakMap();

          const getChildStream = (stream$, id) => {
              let childs = child$s.get(stream$);

              if (!childs) {
                  child$s.set(stream$, childs = {});
              }

              if (childs[id]) {
                  return childs[id];
              }

              return childs[id] = stream$.map(props => props.dict[id]);
          };

          const orderMatches = (prev, next) => prev.order === next.order;
          const id = x => x;

          export default function loop(mapper, callback) {
              if (callback == null) {
                  callback = mapper;
                  mapper = id;
              }

              return stream$ => {
                  const src$ = stream$.map(mapper);

                  return src$.skipDuplicates(orderMatches)
                      .map(props => props.order.map(id => callback(getChildStream(src$, id), id)));
              };
          }
        language: js
---

