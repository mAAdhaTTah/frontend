---
tags:
  - web
  - essay
title: Weekly links - Week of Nov 11th, 2018
description: Unit Testing When you’re working at a startup, we’re building out new features so fast that we’ve not-irregularly introduced bugs to already-complete parts. We don’t have a dedicated QA team and few tests, and we’re looking to get some backstopping going so we can continue to ship with confidence. While I’m looking at eventually integrating \[…]
slug: writing/weekly-links-nov-11th-2018
published_at: 2018-11-18T16:57:07.000Z
updated_at: 2018-11-18T16:57:07.000Z
excerpt: Unit Testing When you’re working at a startup, we’re building out new features so fast that we’ve not-irregularly introduced bugs to already-complete parts. We don’t have a dedicated QA team and few tests, and we’re looking to get some backstopping going so we can continue to ship with confidence. While I’m looking at eventually integrating \[…]
featuredMedia: "[[links]]"
share: true
---

## Unit Testing

When you're working at a startup, we're building out new features so fast that we've not-irregularly introduced bugs to already-complete parts. We don't have a dedicated QA team and few tests, and we're looking to get some backstopping going so we can continue to ship with confidence.

While I'm looking at eventually integrating E2E testing with Cypress, I've been reading about unit testing to see how they could help us. Interestingly enough, I'm not sure we would. The errors we get are triggered by a series of steps that we probably wouldn't reproduce in unit tests, so they wouldn't help prevent these issues.

We could do some integration-type testing, bootstrapping a full or mocked store and dispatching a series of actions to see what results before we get to a full E2E integration, but it feels like unit testing will not be that helpful unless we can unit test large chunks like an entire container.

The articles this week also argue they not only don't provide a lot of coverage but make it difficult for your application to change. I agree with this to the extent that your architecture is still changing. As you settle into it, you can start to capture the corner cases in your tests in ways that allow it expand its functionality without breaking what exists. That does mean it's not useful to us yet.

- [Lean Testing or Why Unit Tests are Worse than You Think](https://blog.usejournal.com/lean-testing-or-why-unit-tests-are-worse-than-you-think-b6500139a009)
- [Confession: I don’t unit test React/Redux code](http://blog.jakoblind.no/confession-i-dont-unit-test-react-redux-code/)

## Amazon is Coming to Queens

The big news this week was the leak that Amazon had decided on two cities for it's new HQ2(.1/.2?): Arlington & Long Island City, Queens, in New York City. Along with this announcement, we discovered the tax incentives for Amazon coming to Queens could top $3 billion dollars. I've read a couple numbers, and the totals depend on how you calculate the incentives, but even the lower end is at least $1 billion.

This came out on the evening before the midterms, while all eyes were on the results of the election, but even with this, we're already seeing a pretty strong reaction to the news. The process through which Amazon chose which city plays cities off each other, and there have been a couple of calls to make it illegal.

More importantly, it's not even clear the city will benefit enough to offset the amount of money it's giving away. The last article below, from the conservative Washington Examiner, goes through the data on these sorts of tax breaks and argues they're not beneficial, as they don't factor in to a company's location planning (Amazon would have chosen New York City anyway) and the city will benefit more from their move if they don't give away almost $3 billion in the process.

It's weird to see a conservative publication agree with a socialist, but there's a shared recognition that this _does not benefit the city_. There's still time to fight this, but not much, so let's get moving.

- [Incentives to Amazon could top $2.8 billion in NYC](https://www.washingtonpost.com/business/incentives-to-amazon-could-top-28-billion-in-nyc/2018/11/14/86ecfc8a-e85a-11e8-8449-1ff263609a31_story.html)
- [How to Stop the Amazon Extortion From Happening Again](https://splinternews.com/how-to-stop-the-amazon-extortion-from-happening-again-1830406069)
- [Amazon’s HQ2 Spectacle Isn’t Just Shameful—It Should Be Illegal](https://www.theatlantic.com/ideas/archive/2018/11/amazons-hq2-spectacle-should-be-illegal/575539/)
- [Alexandria Ocasio-Cortez Is Right about Amazon’s Corporate Welfare](https://www.nationalreview.com/corner/rep-alexandria-ocasio-cortez-is-right-about-amazons-corporate-welfare/)
