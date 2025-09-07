---
tags:
  - web
  - snippet
title: Tagged Unions & Loading State
description: ""
slug: gistpens/tagged-unions-loading-state
published_at: 2019-06-30T13:59:30.000Z
updated_at: 2019-07-01T16:13:22.000Z
share: true
---

```typescript title="array-state.ts"
type State = {
  items: Item[];
};

const initialState: State = {
  items: [],
};
```

^array-state-ts

```typescript title="array-state-null.ts"
type State = {
  items: Item[] | null;
};

const initialState: State = {
  items: null,
};

const loadedState: State = {
  items: response.data,
};
```

^array-state-null-ts


```typescript title="array-error-state.ts"
type State = {
  items: Item[] | null;
  error: Error | null;
};

const initialState: State = {
  items: null,
  error: null,
};

const successState: State = {
  items: response.data,
  error: null,
};

const errorState: State = {
  items: null,
  error: response.error,
};
```

^array-error-state-ts

```typescript title="array-error-conditional.ts"
if (state.items === null && state.error === null) {
  return <UnloadedView />;
}

if (state.items !== null) {
  return <LoadedView items={state.items} />;
}

// We can assume we're in the error state now
return <ErrorView error={state.error} />;
```

^array-error-conditional-ts

```typescript title="array-error-loading.ts"
type State = {
  loading: boolean;
  items: Item[] | null;
  error: Error | null;
};

const defaultState: State = {
  loading: false,
  items: null,
  error: null,
};
```

^array-error-loading-ts

```typescript title="array-error-loading-conditional.ts"
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
```

^array-error-loading-conditional-ts

```typescript title="status-state.ts"
type State = {
  status: "unloaded" | "loading" | "loaded" | "error";
  items: Item[] | null;
  error: Error | null;
};

const defaultState: State = {
  status: "unloaded",
  items: null,
  error: null,
};
```

^status-state-ts

```typescript title="status-conditional.ts"
switch (state.status) {
  case "unloaded":
    return <UnloadedView />;
  case "loading":
    return <LoadingView />;
  case "loaded":
    return <LoadedView items={state.items} />;
  case "error":
    return <ErrorView error={state.error} />;
}
```

^status-conditional-ts

```typescript title="tagged-union.ts"
type First = {
  tag: "first";
  prop: number;
};

type Second = {
  tag: "second";
  value: string;
};

type FirstOrSecond = First | Second;

declare function getFirstOrSecond(): FirstOrSecond;

const thing: FirstOrSecond = getFirstOrSecond();

switch (thing.tag) {
  case "first":
    // TypeScript knows prop exists and is a number.
    // Accessing thing.value would cause an error.
    return thing.prop + 1;
  case "second":
    // And value exists and is a string here
    return thing.value + " came in second";
}
```

^tagged-union-ts

```typescript title="union-fail.ts"
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
if (typeof thing.prop === "number") {
  // TypeScript does not know you have a First
  // without an explicit cast
  const prop = (thing as First).prop;
} else {
  const value = (thing as Second).value;
}
```

^union-fail-ts

```typescript title="tagged-union-state.ts"
type UnloadedState = {
  status: "unloaded";
};

type LoadingState = {
  status: "loading";
};

type LoadedState = {
  status: "loaded";
  items: Item[];
};

type ErrorState = {
  status: "error";
  error: Error;
};

type State = UnloadedState | LoadingState | LoadedState | ErrorState;
```

^tagged-union-state-ts


