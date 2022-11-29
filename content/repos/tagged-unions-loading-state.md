---
description: Tagged Unions & Loading State
status: publish
gistId: ''
sync: false
createdAt: '2019-06-30T13:59:30.000Z'
updatedAt: '2019-07-01T16:13:22.000Z'
blobs:
  - filename: array-error-state.ts
    code: |-
      type State = {
        items: Item[] | null;
        error: Error | null;
      };

      const initialState: State = {
        items: null,
        error: null
      };

      const successState: State = {
        items: response.data,
        error: null
      };

      const errorState: State = {
        items: null,
        error: response.error
      };
    language: typescript
  - filename: array-error-conditional.ts
    code: |-
      if (state.items === null && state.error === null) {
        return <UnloadedView />;
      }

      if (state.items !== null) {
        return <LoadedView items={state.items} />;
      }

      // We can assume we're in the error state now
      return <ErrorView error={state.error} />;
    language: typescript
  - filename: status-state.ts
    code: |-
      type State = {
        status: 'unloaded' | 'loading' | 'loaded' | 'error';
        items: Item[] | null;
        error: Error | null;
      };

      const defaultState: State = {
        status: 'unloaded',
        items: null,
        error: null
      };
    language: typescript
  - filename: array-error-loading.ts
    code: |-
      type State = {
        loading: boolean;
        items: Item[] | null;
        error: Error | null;
      };

      const defaultState: State = {
        loading: false,
        items: null,
        error: null
      };
    language: typescript
  - filename: array-error-loading-conditional.ts
    code: |-
      if (state.loading) {
        return <LoadingView />;
      }

      if (state.items === null && state.error === null) {
        return <UnloadedView />;
      }

      if (state.items !== null) {
        return <LoadedView items={state.items} />;
      }

      return <ErrorView error={state.error} />;
    language: typescript
  - filename: status-conditional.ts
    code: |-
      switch (state.status) {
        case 'unloaded':
          return <UnloadedView />;
        case 'loading':
          return <LoadingView />;
        case 'loaded':
          return <LoadedView items={state.items} />;
        case 'error':
          return <ErrorView error={state.error} />;
      }
    language: typescript
  - filename: tagged-union.ts
    code: |-
      type First = {
        tag: 'first';
        prop: number;
      };

      type Second = {
        tag: 'second';
        value: string;
      }

      type FirstOrSecond = First | Second;

      declare function getFirstOrSecond(): FirstOrSecond;

      const thing: FirstOrSecond = getFirstOrSecond();

      switch (thing.tag) {
        case 'first':
          // TypeScript knows prop exists and is a number.
          // Accessing thing.value would cause an error.
          return thing.prop + 1;
        case 'second':
          // And value exists and is a string here
          return thing.value + ' came in second';
      }
    language: typescript
  - filename: union-fail.ts
    code: |-
      type First = {
        prop: number;
      };

      type Second = {
        value: string;
      };

      type FirstOrSecond = First | Second;

      declare function getFirstOrSecond(): FirstOrSecond;

      const thing: FirstOrSecond = getFirstOrSecond();

      // TypeScript complains about Second not having a `prop` property.
      if (typeof thing.prop === 'number') {
        // TypeScript does not know you have a First
        // without an explicit cast
        const prop = (thing as First).prop;
      } else {
        const value = (thing as Second).value;
      }
    language: typescript
  - filename: tagged-union-state.ts
    code: |-
      type UnloadedState = {
        status: 'unloaded';
      };

      type LoadingState = {
        status: 'loading';
      };

      type LoadedState = {
        status: 'loaded';
        items: Item[];
      };

      type ErrorState = {
        status: 'error';
        error: Error;
      };

      type State = UnloadedState | LoadingState | LoadedState | ErrorState;
    language: typescript
  - filename: array-state.ts
    code: |-
      type State = {
        items: Item[];
      };

      const defaultState: State = {
        items: []
      };
    language: typescript
commits:
  - committedAt: '2019-07-01T20:13:22.000Z'
    description: Tagged Unions & Loading State
    blobs:
      - filename: array-error-state.ts
        code: |-
          type State = {
            items: Item[] | null;
            error: Error | null;
          };

          const initialState: State = {
            items: null,
            error: null
          };

          const successState: State = {
            items: response.data,
            error: null
          };

          const errorState: State = {
            items: null,
            error: response.error
          };
        language: typescript
      - filename: array-error-conditional.ts
        code: |-
          if (state.items === null && state.error === null) {
            return <UnloadedView />;
          }

          if (state.items !== null) {
            return <LoadedView items={state.items} />;
          }

          // We can assume we're in the error state now
          return <ErrorView error={state.error} />;
        language: typescript
      - filename: status-state.ts
        code: |-
          type State = {
            status: 'unloaded' | 'loading' | 'loaded' | 'error';
            items: Item[] | null;
            error: Error | null;
          };

          const defaultState: State = {
            status: 'unloaded',
            items: null,
            error: null
          };
        language: typescript
      - filename: array-error-loading.ts
        code: |-
          type State = {
            loading: boolean;
            items: Item[] | null;
            error: Error | null;
          };

          const defaultState: State = {
            loading: false,
            items: null,
            error: null
          };
        language: typescript
      - filename: array-error-loading-conditional.ts
        code: |-
          if (state.loading) {
            return <LoadingView />;
          }

          if (state.items === null && state.error === null) {
            return <UnloadedView />;
          }

          if (state.items !== null) {
            return <LoadedView items={state.items} />;
          }

          return <ErrorView error={state.error} />;
        language: typescript
      - filename: status-conditional.ts
        code: |-
          switch (state.status) {
            case 'unloaded':
              return <UnloadedView />;
            case 'loading':
              return <LoadingView />;
            case 'loaded':
              return <LoadedView items={state.items} />;
            case 'error':
              return <ErrorView error={state.error} />;
          }
        language: typescript
      - filename: tagged-union.ts
        code: |-
          type First = {
            tag: 'first';
            prop: number;
          };

          type Second = {
            tag: 'second';
            value: string;
          }

          type FirstOrSecond = First | Second;

          declare function getFirstOrSecond(): FirstOrSecond;

          const thing: FirstOrSecond = getFirstOrSecond();

          switch (thing.tag) {
            case 'first':
              // TypeScript knows prop exists and is a number.
              // Accessing thing.value would cause an error.
              return thing.prop + 1;
            case 'second':
              // And value exists and is a string here
              return thing.value + ' came in second';
          }
        language: typescript
      - filename: union-fail.ts
        code: |-
          type First = {
            prop: number;
          };

          type Second = {
            value: string;
          };

          type FirstOrSecond = First | Second;

          declare function getFirstOrSecond(): FirstOrSecond;

          const thing: FirstOrSecond = getFirstOrSecond();

          // TypeScript complains about Second not having a `prop` property.
          if (typeof thing.prop === 'number') {
            // TypeScript does not know you have a First
            // without an explicit cast
            const prop = (thing as First).prop;
          } else {
            const value = (thing as Second).value;
          }
        language: typescript
      - filename: tagged-union-state.ts
        code: |-
          type UnloadedState = {
            status: 'unloaded';
          };

          type LoadingState = {
            status: 'loading';
          };

          type LoadedState = {
            status: 'loaded';
            items: Item[];
          };

          type ErrorState = {
            status: 'error';
            error: Error;
          };

          type State = UnloadedState | LoadingState | LoadedState | ErrorState;
        language: typescript
      - filename: array-state.ts
        code: |-
          type State = {
            items: Item[];
          };

          const defaultState: State = {
            items: []
          };
        language: typescript
  - committedAt: '2019-06-30T20:50:21.000Z'
    description: Tagged Unions & Loading State
    blobs:
      - filename: array-error-state.ts
        code: |-
          type State = {
            items: Item[] | null;
            error: Error | null;
          };

          const initialState: State = {
            items: null,
            error: null
          };

          const successState: State = {
            items: response.data,
            error: null
          };

          const errorState: State {
            items: null,
            error: response.error
          };
        language: typescript
      - filename: array-error-conditional.ts
        code: |-
          if (state.items === null && state.error === null) {
            return <UnloadedView />;
          }

          if (state.items !== null) {
            return <LoadedView items={state.items} />;
          }

          // We can assume we're in the error state now
          return <ErrorView error={state.error} />;
        language: typescript
      - filename: status-state.ts
        code: |-
          type State = {
            status: 'unloaded' | 'loading' | 'loaded' | 'error';
            items: Item[] | null;
            error: Error | null;
          };

          const defaultState: State = {
            status: 'unloaded',
            items: null,
            error: null
          };
        language: typescript
      - filename: array-error-loading.ts
        code: |-
          type State = {
            loading: boolean;
            items: Item[] | null;
            error: Error | null;
          };

          const defaultState: State = {
            loading: false,
            items: null,
            error: null
          };
        language: typescript
      - filename: array-error-loading-conditional.ts
        code: |-
          if (state.loading) {
            return <LoadingView />;
          }

          if (state.items === null && state.error === null) {
            return <UnloadedView />;
          }

          if (state.items !== null) {
            return <LoadedView items={state.items} />;
          }

          return <ErrorView error={state.error} />;
        language: typescript
      - filename: status-conditional.ts
        code: |-
          switch (state.status) {
            case 'unloaded':
              return <UnloadedView />;
            case 'loading':
              return <LoadingView />;
            case 'loaded':
              return <LoadedView items={state.items} />;
            case 'error':
              return <ErrorView error={state.error} />;
          }
        language: typescript
      - filename: tagged-union.ts
        code: |-
          type First = {
            tag: 'first';
            prop: number;
          };

          type Second = {
            tag: 'second';
            value: string;
          }

          type FirstOrSecond = First | Second;

          declare function getFirstOrSecond(): FirstOrSecond;

          const thing: FirstOrSecond = getFirstOrSecond();

          switch (thing.tag) {
            case 'first':
              // TypeScript knows prop exists and is a number.
              // Accessing thing.value would cause an error.
              return thing.prop + 1;
            case 'second':
              // And value exists and is a string here
              return thing.value + ' came in second';
          }
        language: typescript
      - filename: union-fail.ts
        code: |-
          type First = {
            prop: number;
          };

          type Second = {
            value: string;
          };

          type FirstOrSecond = First | Second;

          declare function getFirstOrSecond(): FirstOrSecond;

          const thing: FirstOrSecond = getFirstOrSecond();

          // TypeScript complains about Second not having a `prop` property.
          if (typeof thing.prop === 'number') {
            // TypeScript does not know you have a First
            // without an explicit cast
            const prop = (thing as First).prop;
          } else {
            const value = (thing as Second).value;
          }
        language: typescript
      - filename: tagged-union-state.ts
        code: |-
          type UnloadedState = {
            status: 'unloaded';
          };

          type LoadingState = {
            status: 'loading';
          };

          type LoadedState = {
            status: 'loaded';
            items: Item[];
          };

          type ErrorState = {
            status: 'error';
            error: Error;
          };

          type State = UnloadedState | LoadingState | LoadedState | ErrorState;
        language: typescript
      - filename: array-state.ts
        code: |-
          type State = {
            items: Item[];
          };

          const defaultState: State = {
            items: []
          };
        language: typescript
  - committedAt: '2019-06-30T19:55:56.000Z'
    description: Tagged Unions & Loading State
    blobs:
      - filename: array-error-state.ts
        code: |-
          type State = {
            items: Item[] | null;
            error: Error | null;
          };

          const unloadedState: State = {
            items: null,
            error: null
          };

          const successState: State = {
            items: response.data,
            error: null
          };

          const errorState: State {
            items: null,
            error: response.error
          };
        language: typescript
      - filename: array-error-conditional.ts
        code: |-
          if (state.items === null && state.error === null) {
            return <UnloadedView />;
          }

          if (state.items !== null) {
            return <LoadedView items={state.items} />;
          }

          // We can assume we're in the error state now
          return <ErrorView error={state.error} />;
        language: typescript
      - filename: status-state.ts
        code: |-
          type State = {
            status: 'unloaded' | 'loading' | 'loaded' | 'error';
            items: Item[] | null;
            error: Error | null;
          };

          const defaultState: State = {
            status: 'unloaded',
            items: null,
            error: null
          };
        language: typescript
      - filename: array-error-loading.ts
        code: |-
          type State = {
            loading: boolean;
            items: Item[] | null;
            error: Error | null;
          };

          const defaultState: State = {
            loading: false,
            items: null,
            error: null
          };
        language: typescript
      - filename: array-error-loading-conditional.ts
        code: |-
          if (state.loading) {
            return <LoadingView />;
          }

          if (state.items === null && state.error === null) {
            return <UnloadedView />;
          }

          if (state.items !== null) {
            return <LoadedView items={state.items} />;
          }

          return <ErrorView error={state.error} />;
        language: typescript
      - filename: status-conditional.ts
        code: |-
          switch (state.status) {
            case 'unloaded':
              return <UnloadedView />;
            case 'loading':
              return <LoadingView />;
            case 'loaded':
              return <LoadedView items={state.items} />;
            case 'error':
              return <ErrorView error={state.error} />;
          }
        language: typescript
      - filename: tagged-union.ts
        code: |-
          type First = {
            tag: 'first';
            prop: number;
          };

          type Second = {
            tag: 'second';
            value: string;
          }

          type FirstOrSecond = First | Second;

          declare function getFirstOrSecond(): FirstOrSecond;

          const thing: FirstOrSecond = getFirstOrSecond();

          switch (thing.tag) {
            case 'first':
              // TypeScript knows prop exists and is a number.
              // Accessing thing.value would cause an error.
              return thing.prop + 1;
            case 'second':
              // And value exists and is a string here
              return thing.value + ' came in second';
          }
        language: typescript
      - filename: union-fail.ts
        code: |-
          type First = {
            prop: number;
          };

          type Second = {
            value: string;
          };

          type FirstOrSecond = First | Second;

          declare function getFirstOrSecond(): FirstOrSecond;

          const thing: FirstOrSecond = getFirstOrSecond();

          // TypeScript complains about Second not having a `prop` property.
          if (typeof thing.prop === 'number') {
            // TypeScript does not know you have a First
            // without an explicit cast
            const prop = (thing as First).prop;
          } else {
            const value = (thing as Second).value;
          }
        language: typescript
      - filename: tagged-union-state.ts
        code: |-
          type UnloadedState = {
            status: 'unloaded';
          };

          type LoadingState = {
            status: 'loading';
          };

          type LoadedState = {
            status: 'loaded';
            items: Item[];
          };

          type ErrorState = {
            status: 'error';
            error: Error;
          };

          type State = UnloadedState | LoadingState | LoadedState | ErrorState;
        language: typescript
  - committedAt: '2019-06-30T19:36:53.000Z'
    description: Tagged Unions & Loading State
    blobs:
      - filename: array-error-state.ts
        code: |-
          type State = {
            items: Item[] | null;
            error: Error | null;
          };

          const unloadedState: State = {
            items: null,
            error: null
          };

          const successState: State = {
            items: response.data,
            error: null
          };

          const errorState: State {
            items: null,
            error: response.error
          };
        language: typescript
      - filename: array-error-conditional.ts
        code: |-
          if (state.items === null && state.error === null) {
            return <UnloadedView />;
          }

          if (state.items !== null) {
            return <LoadedView items={state.items} />;
          }

          // We can assume we're in the error state now
          return <ErrorView error={state.error} />;
        language: typescript
      - filename: status-state.ts
        code: |-
          type State = {
            status: 'unloaded' | 'loading' | 'loaded' | 'error';
            items: Item[] | null;
            error: Error | null;
          };

          const defaultState: State = {
            status: 'unloaded',
            items: null,
            error: null
          };
        language: typescript
      - filename: array-error-loading.ts
        code: |-
          type State = {
            loading: boolean;
            items: Item[] | null;
            error: Error | null;
          };

          const defaultState: State = {
            loading: false,
            items: null,
            error: null
          };
        language: typescript
      - filename: array-error-loading-conditional.ts
        code: |-
          if (state.loading) {
            return <LoadingView />;
          }

          if (state.items === null && state.error === null) {
            return <UnloadedView />;
          }

          if (state.items !== null) {
            return <LoadedView items={state.items} />;
          }

          return <ErrorView error={state.error} />;
        language: typescript
      - filename: status-conditional.ts
        code: |-
          switch (state.status) {
            case 'unloaded':
              return <UnloadedView />;
            case 'loading':
              return <LoadingView />;
            case 'loaded':
              return <LoadedView items={state.items} />;
            case 'error':
              return <ErrorView error={state.error} />;
          }
        language: typescript
      - filename: tagged-union.ts
        code: |-
          type First = {
            tag: 'first';
            prop: number;
          };

          type Second = {
            tag: 'second';
            value: string;
          }

          type FirstOrSecond = First | Second;

          declare function getFirstOrSecond(): FirstOrSecond;

          const thing: FirstOrSecond = getFirstOrSecond();

          switch (thing.tag) {
            case 'first':
              // TypeScript knows prop exists and is a number.
              // Accessing thing.value would cause an error.
              return thing.prop + 1;
            case 'second':
              // And value exists and is a string here
              return thing.value + ' came in second';
          }
        language: typescript
      - filename: union-fail.ts
        code: |-
          type First = {
            prop: number;
          };

          type Second = {
            value: string;
          };

          type FirstOrSecond = First | Second;

          declare function getFirstOrSecond(): FirstOrSecond;

          const thing: FirstOrSecond = getFirstOrSecond();

          // TypeScript complains about Second not having a `prop` property.
          if (typeof thing.prop === 'number') {
            // TypeScript does not know you have a First
            // without an explicit cast
            const prop = (thing as First).prop;
          } else {
            const value = (thing as Second).value;
          }
        language: typescript
  - committedAt: '2019-06-30T19:21:39.000Z'
    description: Tagged Unions & Loading State
    blobs:
      - filename: array-error-state.ts
        code: |-
          type State = {
            items: Item[] | null;
            error: Error | null;
          };

          const unloadedState: State = {
            items: null,
            error: null
          };

          const successState: State = {
            items: response.data,
            error: null
          };

          const errorState: State {
            items: null,
            error: response.error
          };
        language: typescript
      - filename: array-error-conditional.ts
        code: |-
          if (state.items === null && state.error === null) {
            return <UnloadedView />;
          }

          if (state.items !== null) {
            return <LoadedView items={state.items} />;
          }

          // We can assume we're in the error state now
          return <ErrorView error={state.error} />;
        language: typescript
      - filename: status-state.ts
        code: |-
          type State = {
            status: 'unloaded' | 'loading' | 'loaded' | 'error';
            items: Item[] | null;
            error: Error | null;
          };

          const defaultState: State = {
            status: 'unloaded',
            items: null,
            error: null
          };
        language: typescript
      - filename: array-error-loading.ts
        code: |-
          type State = {
            loading: boolean;
            items: Item[] | null;
            error: Error | null;
          };

          const defaultState: State = {
            loading: false,
            items: null,
            error: null
          };
        language: typescript
      - filename: array-error-loading-conditional.ts
        code: |-
          if (state.loading) {
            return <LoadingView />;
          }

          if (state.items === null && state.error === null) {
            return <UnloadedView />;
          }

          if (state.items !== null) {
            return <LoadedView items={state.items} />;
          }

          return <ErrorView error={state.error} />;
        language: typescript
      - filename: status-conditional.ts
        code: |-
          switch (state.status) {
            case 'unloaded':
              return <UnloadedView />;
            case 'loading':
              return <LoadingView />;
            case 'loaded':
              return <LoadedView items={state.items} />;
            case 'error':
              return <ErrorView error={state.error} />;
          }
        language: typescript
      - filename: tagged-union.ts
        code: |-
          type First = {
            tag: 'first';
            prop: number;
          };

          type Second = {
            tag: 'second';
            value: string;
          }

          type FirstOrSecond = First | Second;

          const thing: FirstOrSecond = getFOrS();

          switch (thing.tag) {
            case 'first':
              // TypeScript knows prop exists and is a number.
              // Accessing thing.value would cause an error.
              return thing.prop + 1;
            case 'second':
              // And value exists and is a string here
              return thing.value + ' came in second';
          }
        language: typescript
  - committedAt: '2019-06-30T19:00:59.000Z'
    description: Tagged Unions & Loading State
    blobs:
      - filename: array-error-state.ts
        code: |-
          type State = {
            items: Item[] | null;
            error: Error | null;
          };

          const unloadedState: State = {
            items: null,
            error: null
          };

          const successState: State = {
            items: response.data,
            error: null
          };

          const errorState: State {
            items: null,
            error: response.error
          };
        language: typescript
      - filename: array-error-conditional.ts
        code: |-
          if (state.items === null && state.error === null) {
            return <UnloadedView />;
          }

          if (state.items !== null) {
            return <LoadedView items={state.items} />;
          }

          // We can assume we're in the error state now
          return <ErrorView error={state.error} />;
        language: typescript
      - filename: status-state.ts
        code: |-
          type State = {
            status: 'unloaded' | 'loading' | 'loaded' | 'error';
            items: Item[] | null;
            error: Error | null;
          };

          const defaultState: State = {
            status: 'unloaded',
            items: null,
            error: null
          };
        language: typescript
      - filename: array-error-loading.ts
        code: |-
          type State = {
            loading: boolean;
            items: Item[] | null;
            error: Error | null;
          };

          const defaultState: State = {
            loading: false,
            items: null,
            error: null
          };
        language: typescript
      - filename: array-error-loading-conditional.ts
        code: |-
          if (state.loading) {
            return <LoadingView />;
          }

          if (state.items === null && state.error === null) {
            return <UnloadedView />;
          }

          if (state.items !== null) {
            return <LoadedView items={state.items} />;
          }

          return <ErrorView error={state.error} />;
        language: typescript
      - filename: status-conditional.ts
        code: |-
          switch (state.status) {
            case 'unloaded':
              return <UnloadedView />;
            case 'loading':
              return <LoadingView />;
            case 'loaded':
              return <LoadedView items={state.items} />;
            case 'error':
              return <ErrorView error={state.error} />;
          }
        language: typescript
  - committedAt: '2019-06-30T18:58:00.000Z'
    description: Tagged Unions & Loading State
    blobs:
      - filename: array-error-state.ts
        code: |-
          type State = {
            items: Item[] | null;
            error: Error | null;
          };

          const unloadedState: State = {
            items: null,
            error: null
          };

          const successState: State = {
            items: response.data,
            error: null
          };

          const errorState: State {
            items: null,
            error: response.error
          };
        language: typescript
      - filename: array-error-conditional.ts
        code: |-
          if (state.items === null && state.error === null) {
            return <UnloadedView />;
          }

          if (state.items !== null) {
            return <LoadedView items={state.items} />;
          }

          // We can assume we're in the error state now
          return <ErrorView error={state.error} />;
        language: typescript
      - filename: status-state.ts
        code: |-
          type State = {
            status: 'unloaded' | 'loading' | 'loaded' | 'error';
            items: Item[] | null;
            error: Error | null;
          };

          const defaultState: State = {
            status: 'unloaded',
            items: null,
            error: null
          };
        language: typescript
      - filename: array-error-loading.ts
        code: |-
          type State = {
            loading: boolean;
            items: Item[] | null;
            error: Error | null;
          };

          const defaultState: State = {
            loading: false,
            items: null,
            error: null
          };
        language: typescript
      - filename: array-error-loading-conditional.ts
        code: |-
          if (state.loading) {
            return <LoadingView />;
          }

          if (state.items === null && state.error === null) {
            return <UnloadedView />;
          }

          if (state.items !== null) {
            return <LoadedView items={state.items} />;
          }

          return <ErrorView error={state.error} />;
        language: typescript
      - filename: status-conditional.ts
        code: |-
          switch (state.status) {
            case 'unloaded':
              return <UnloadedView />;
            case 'loading':
              return <LoadingView />;
            case 'loaded':
              return <LoadedView />;
            case 'error':
              return <ErrorView />;
          }
        language: typescript
  - committedAt: '2019-06-30T18:53:26.000Z'
    description: Tagged Unions & Loading State
    blobs:
      - filename: array-error-state.ts
        code: |-
          type State = {
            items: Item[] | null;
            error: Error | null;
          };

          const unloadedState: State = {
            items: null,
            error: null
          };

          const successState: State = {
            items: response.data,
            error: null
          };

          const errorState: State {
            items: null,
            error: response.error
          };
        language: typescript
      - filename: array-error-conditional.ts
        code: |-
          if (state.items === null && state.error === null) {
            return <UnloadedView />;
          }

          if (state.items !== null) {
            return <LoadedView items={state.items} />;
          }

          // We can assume we're in the error state now
          return <ErrorView error={state.error} />;
        language: typescript
      - filename: status-state.ts
        code: |-
          type State = {
            status: 'unloaded' | 'loading' | 'loaded' | 'error';
            items: Item[] | null;
            error: Error | null;
          };

          const defaultState: State = {
            status: 'unloaded',
            items: null,
            error: null
          };
        language: typescript
      - filename: array-error-loading.ts
        code: |-
          type State = {
            loading: boolean;
            items: Item[] | null;
            error: Error | null;
          };

          const defaultState: State = {
            loading: false,
            items: null,
            error: null
          };
        language: typescript
      - filename: array-error-loading-conditional.ts
        code: |-
          if (state.loading) {
            return <LoadingView />;
          }

          if (state.items === null && state.error === null) {
            return <UnloadedView />;
          }

          if (state.items !== null) {
            return <LoadedView items={state.items} />;
          }

          return <ErrorView error={state.error} />;
        language: typescript
  - committedAt: '2019-06-30T18:50:25.000Z'
    description: Tagged Unions & Loading State
    blobs:
      - filename: array-error-state.ts
        code: |-
          type State = {
            items: Item[] | null;
            error: Error | null;
          };

          const unloadedState: State = {
            items: null,
            error: null
          };

          const successState: State = {
            items: response.data,
            error: null
          };

          const errorState: State {
            items: null,
            error: response.error
          };
        language: typescript
      - filename: array-error-conditional.ts
        code: |-
          if (state.items === null && state.error === null) {
            return <UnloadedView />;
          }

          if (state.items !== null) {
            return <LoadedView items={state.items} />;
          }

          // We can assume we're in the error state now
          return <ErrorView error={state.error} />;
        language: typescript
      - filename: status-state.ts
        code: |-
          type State = {
            status: 'unloaded' | 'loading' | 'loaded' | 'error';
            items: Item[] | null;
            error: Error | null;
          };

          const defaultState: State = {
            status: 'unloaded',
            items: null,
            error: null
          };
        language: typescript
      - filename: array-error-loading.ts
        code: |-
          type State = {
            loading: boolean;
            items: Item[] | null;
            error: Error | null;
          };

          const defaultState: State = {
            loading: false,
            items: null,
            error: null
          };
        language: typescript
  - committedAt: '2019-06-30T18:45:40.000Z'
    description: Tagged Unions & Loading State
    blobs:
      - filename: array-error-state.ts
        code: |-
          type State = {
            items: Item[] | null;
            error: Error | null;
          };

          const unloadedState: State = {
            items: null,
            error: null
          };

          const successState: State = {
            items: response.data,
            error: null
          };

          const errorState: State {
            items: null,
            error: response.error
          };
        language: typescript
      - filename: array-error-conditional.ts
        code: |-
          if (state.items === null && state.error === null) {
            return <UnloadedView />;
          }

          if (state.items !== null) {
            return <LoadedView items={state.items} />;
          }

          // We can assume we're in the error state now
          return <ErrorView error={state.error} />;
        language: typescript
      - filename: status-state.ts
        code: |-
          type State = {
            status: 'unloaded' | 'loading' | 'loaded' | 'error';
            items: Item[] | null;
            error: Error | null;
          };

          const defaultState: State = {
            status: 'unloaded',
            items: null,
            error: null
          };
        language: typescript
  - committedAt: '2019-06-30T18:37:27.000Z'
    description: Tagged Unions & Loading State
    blobs:
      - filename: array-error-state.ts
        code: |-
          type State = {
            items: Item[] | null;
            error: Error | null;
          };

          const unloadedState: State = {
            items: null,
            error: null
          };

          const successState: State = {
            items: response.data,
            error: null
          };

          const errorState: State {
            items: null,
            error: response.error
          };
        language: typescript
      - filename: array-error-conditional.ts
        code: |-
          if (state.items === null && state.error === null) {
            return <UnloadedView />;
          }

          if (state.items !== null) {
            return <LoadedView items={state.items} />;
          }

          // We can assume we're in the error state now
          return <ErrorView error={state.error} />;
        language: typescript
  - committedAt: '2019-06-30T18:26:35.000Z'
    description: Tagged Unions & Loading State
    blobs:
      - filename: array-error-state.ts
        code: |-
          type State = {
            items: Item[] | null;
            error: Error | null;
          };

          const defaultState: State = {
            items: null,
            error: null
          };
        language: typescript
  - committedAt: '2019-06-30T18:11:44.000Z'
    description: Tagged Unions & Loading State
  - committedAt: '2019-06-30T17:59:30.000Z'
    description: Tagged Unions & Loading State
---

