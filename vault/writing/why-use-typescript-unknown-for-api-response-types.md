---
tags:
  - web
  - essay
title: Why use TypeScript unknown for API response types
description: I recently extracted and released kefir-ajax, a fetch-like ajax library for Kefir. While I wrote the library in plain JavaScript, the library generates TypeScript typings from its JSDocs. As you can see here, the json method of the ObsResponse class returns TypeScript unknown, rather than the much more common any. Using unknown instead of any \[…]
slug: writing/why-use-typescript-unknown-for-api-response-types
published_at: 2020-07-09T16:00:00.000Z
updated_at: 2022-07-26T11:42:52.000Z
excerpt: I recently extracted and released kefir-ajax, a fetch-like ajax library for Kefir. While I wrote the library in plain JavaScript, the library generates TypeScript typings from its JSDocs. As you can see here, the json method of the ObsResponse class returns TypeScript unknown, rather than the much more common any. Using unknown instead of any \[…]
featuredMedia: "[[unknown-scissors]]"
share: true
---

I recently extracted and released [`kefir-ajax`](https://github.com/kefirjs/kefir-ajax), a fetch-like ajax library for Kefir. While I wrote the library in plain JavaScript, the library generates TypeScript typings from its JSDocs. As you can see [here](https://github.com/kefirjs/kefir-ajax/blob/master/src/kefir-ajax.js#L56-L68), the `json` method of the `ObsResponse` class returns TypeScript `unknown`, rather than the much more common `any`. Using `unknown` instead of `any` here in TypeScript may make the API more awkward to use, so I wanted to explain why I made this decision.

## TypeScript `unknown` makes the API more reliable

While this may make the API slightly more awkward, it provides a much sounder typing for your APIs. With `any`, you have no guarantee that any of those API values are what TypeScript thinks they are. This pushes your errors away from their source, as they start appearing when you rely on guarantees you don't have. This shows up in your error logs as `property of 'undefined'` errors and can be very difficult to debug. API responses aren't the first place you will look unless they're really close to the location of the error.

If the response body is `unknown`, TypeScript either forces you to validate it before you can do anything with it or explicitly cast it to `any`. For the former case, you can use a library like [`io-ts`](https://github.com/gcanti/io-ts) or [`runtypes`](https://github.com/pelotom/runtypes) to validate your `unknown` types to concrete ones (I'm currently using the former). Both of these packages accept an `unknown` API response and provide either a validated, strictly typed API response, or an error, which you can then handle as you choose.

## What if you don't want to validate?

If neither of those work for you, you can cast to `any` and get on with your life. You've explicitly opted into `any`, rather than having `kefir-ajax` introduce that for you. Later on, when you decide to introduce strict type validation to you API responses, you can easily find where it's needed. Search your codebase for `any` and wrap those with your new API validations.

Kefir in particular makes this really nice, because you can push any errors down Kefir's error channel:

<InternalEmbed title="gistpens/typescript-unknown-with-kefir-ajax" url="/vault/gistpens/typescript-unknown-with-kefir-ajax.md">
```typescript title="validate.ts"
ajax$(...)
  .flatMap(response => response.json())
  .flatMap(body => // body is `unknown`
    ResponseType.decode(body).fold<Observable<ResponseType, t.Error>>(
      Kefir.constantError,
      Kefir.constant,
    )
  )
```
</InternalEmbed>

The error type gets added to the downstream type, and TypeScript warns you if you haven't handled it, `t.Error`. TypeScript's compiler helps you introduce the validation without adding new bugs at the same time.

But even if you don't use Kefir, or `kefir-ajax`, use `unknown` for your API responses then validate them. This helps you build trust in what TypeScript is telling you and keeps your errors closer to their cause.
