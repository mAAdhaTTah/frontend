---
description: Removed brookjs Actions
status: publish
gistId: ''
sync: true
createdAt: '2017-01-22T14:07:50.000Z'
updatedAt: '2017-01-22T14:08:10.000Z'
blobs:
  - filename: removed-actions.js
    code: |-
      /**
       * Value change Action type.
       *
       * @type {string}
       */
      export const VALUE_CHANGE = 'VALUE_CHANGE';

      /**
       * Create a new Value Change action.
       *
       * @param {string} value - Target value.
       * @returns {Action} Value Change action object.
       */
      export function valueEventAction(value) {
          return {
              type: VALUE_CHANGE,
              payload: { value }
          };
      }

      /**
       * Field focus event action type.
       *
       * @type {string}
       */
      export const FIELD_FOCUS = 'FIELD_FOCUS';

      /**
       * Create a FIELD_FOCUS action object.
       *
       * @param {string} name - Field name.
       * @returns {Action} FIELD_FOCUS action.
       */
      export function fieldFocusAction(name) {
          return {
              type: FIELD_FOCUS,
              payload: { name }
          };
      }

      /**
       * Checked change constant.
       *
       * @type {string}
       */
      export const CHECKED_CHANGE = 'CHECKED_CHANGE';

      /**
       * Create a new Checked Change action.
       *
       * @param {boolean} value - Target checked.
       * @returns {Action} Checked Change action object.
       */
      export function checkedEventAction(value) {
          return {
              type: CHECKED_CHANGE,
              payload: { value }
          };
      }

      /**
       * Click event Action type.
       *
       * @type {string}
       */
      export const CLICK = 'CLICK';

      /**
       * Create a new Clicked Action
       *
       * @returns {Action} Clicked action object.
       */
      export function clickedEventAction() {
          return { type: CLICK };
      }
    language: js
commits:
  - committedAt: '2017-08-06T20:35:57.000Z'
    description: Removed brookjs Actions
---

