---
title: 'Weekly Links - Week of Nov 4th, 2018'
publishedAt: '2018-11-10T17:50:49.000Z'
updatedAt: '2018-11-10T17:50:49.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: publish
body:
  - content: >
      This week, I updated my [James Reads
      site](https://jamesdigioia.com/reading/) to use
      [Gatsby](http://gatsbyjs.org), powered by a combination of Pocket & the
      WordPress site that currently resides on that domain. I do a lot of
      reading on Pocket, and I've been meaning to figure out a way to display
      both Pocket- & WP-saved links there. Initially, that was going to be
      pulling in my Pocket list into WordPress, but I'm considering moving away
      from WordPress as [Gutenberg controversially lumbers towards a
      release](https://wptavern.com/calls-to-delay-wordpress-5-0-increase-developers-cite-usability-concerns-and-numerous-bugs-in-gutenberg).
      In the meantime, spinning up a Gatsby site was really easy and allowed me
      to decouple the data source from the front-end display of that data, so I
      can eventually move the data source without needing to rewrite my
      front-end. If you're interested, you can see the source
      [here](https://github.com/mAAdhaTTah/frontend).


      Because I've now finally got *all* my readings up in one place, I can
      start doing what I've been meaning to do for a long time: start a weekly
      link post! I don't do enough writing, and this seems like a good way to
      get into a regular habit without having to commit a ton of time to start.
      So, without further ado, here's some highlights of what I've been reading
      and thinking over the past week:


      ## GraphQL


      We've been considering GraphQL at work to solve our data fetching issues.
      We've got a number of charts & graphs that need data from a few different
      endpoints, and we're looking at whether providing a GraphQL API would help
      simplify things. I'm currently a bit hesitant; a lot of the
      implementations of GraphQL with React use components to declare their data
      needs, and my current feeling is components are for display/UI and
      shouldn't be tied to data fetching. I've been using Redux and have been
      pushing to get as much of that handling out of components and into
      middleware, so GraphQL seems like a step backwards.


      That said, being able to send a single request instead of a half-dozen
      would be really nice, and it's possible I'm being too rigid. The PayPal
      experience was glowing, and certainly made it easier for them to iterate
      on what they were building compared to the previous REST-y approach. It
      was also great to see some of the downsides, but most of those downsides
      are on the back-end, where it definitely increases the complexity. We'd
      have to add Node to our stack, and while it makes front-end querying
      easier, making sure the queries work on the back-end could be more
      difficult.


      I'm also still looking to see if anyone is going GraphQL queries in Redux
      middleware, rather than in the components, but that seems like mostly a
      "no" so far. If you are, I would love to hear from you!


      * [GraphQL: A success story for PayPal
      Checkout](https://medium.com/paypal-engineering/graphql-a-success-story-for-paypal-checkout-3482f724fb53)

      * [GraphQL -- The Good and the
      Bad](https://scotch.io/tutorials/graphql-the-good-and-the-bad)


      ## Functional (or Utility-first) CSS


      The other sore spot I'm spending time looking into is our CSS stack. I've
      used [styled-components](https://styled-components.com) on two projects
      now, and I can't say I'm a huge fan at this point. It makes it difficult
      to visualize the resulting DOM structure, as every element is a
      styled-component with a name. Former coworkers have reported performance
      issues with it, although some of that may no longer be an issue in v4.
      Although this is probably true of most CSS solutions, I'm finding it
      requires discipline to not reimplement the same styles multiple times. You
      really need to be aggressive in extracting CSS either into the theme or
      shared components for reuse.


      Some of this is admittedly on us as users, but it feels like a question of
      what the tech affords you. For these reasons, I've been looking hard at
      Functional CSS as a paradigm going forward. I'm using
      [TailwindCSS](https://tailwindcss.com) on the aforementioned Gatsby site,
      and part of what I like is how limiting it is. You *can* write your own
      CSS, if you must, but you're not encouraged to do so. Instead, it pushes
      you to reuse the dozens of CSS classes that already ship with Tailwind.
      It's also a lot easier to visualize your HTML, as all the underlying
      elements are still there, plus you can look at those elements to visualize
      exactly what CSS is going to be applied. Lastly, the overall design system
      in then embedded in these minimal number of classes, so you're limited as
      to the number of styles you can use at any given time, which enforces more
      consistency.


      It also results in a lot *less* CSS overall, as each component doesn't
      require you to write CSS to style it. I've been really excited by how well
      it has worked on my Gatsby site, and I've been looking at whether & how we
      can apply some of these principles to styled-components, as a complete
      overhaul is out of the question at this time. Looking at some of those
      experiences with Functional CSS has been really enlightening.


      * [On Moving to a Utility-first CSS
      Framework](https://familiar.studio/blog/utility-first-css-framework)

      * [Styling with Functional
      CSS](https://blog.rangle.io/styling-with-functional-css/)


      ## Voter Disenfranchisement


      The midterms were Tuesday, and one of the "memes" that pops up around
      every election is complaints about the large swath of people who don't
      vote. There are, admittedly, some people who explicitly choose not to
      vote; they believe it doesn't matter, their vote doesn't count, both
      parties are the same, etc. I'm not going to equivocate: those people are
      **wrong**--aggressively, stupidly wrong. I remember seeing this comment in
      one of the lefty groups I'm in: "If voting had the power to change things,
      they would have taken it away from you." Which is dumb, because they *are*
      trying to take it away from you.


      On the flip side, those who look down on non-voters generally assume
      apathy and come with a tone of condescension. The worst part is it doesn't
      typically come from an understanding of *why* people don't vote, nor does
      it offer solutions to the real difficulties people have voting.


      All of this is on my mind as I read reports from Georgia of 4 hour lines
      to vote, voting machines locked away unused, and purges of registered
      voters. So I read the below two articles with interest, especially looking
      at why young people in particular don't vote.


      The assumption has always been that they don't care, but the argument
      Jamelle Bouie makes is the systems are simply not designed to enable
      individuals with unstable lives to vote. If you move a lot, as young
      people do, updating your registration every couple of months is a hassle.
      If you need an ID to update said registration, now there's another barrier
      to getting there. If you don't have access to a car or public transit,
      getting to the locations to get either of these things becomes another
      barrier.


      This doesn't just apply to young people either, but to anyone living
      unstable lives, which are often poor or minorities. Voting takes place on
      a Tuesday, so voters have to take off work to vote (especially if they
      have to stand in a 4hr line to do so), and many states don't have early
      voting (like my home state, New York, which has abysmally low turnout) or
      allow vote-by-mail. On top of all that, add the explicit barriers to
      voting, such as voter ID laws (in TX, you can use your gun or military
      license to register but not your student or employer ID) and closed
      polling locations, and you end up with a system that both passively and
      actively makes it difficult for people to vote.


      So when I hear people complain about non-voters, I'm not hearing solutions
      besides "try harder." We as a culture love to blame individuals for
      systemic problems, and if you're actually interested in getting people out
      to vote, we need to focus on the barriers to voting instead of castigating
      individuals for not climbing over them.


      Maybe if voting didn't suck, more people would vote? Just a thought...


      * [Why Don’t Young People Vote? This System Doesn’t Want Them
      To.](https://slate.com/news-and-politics/2018/11/voter-registration-young-people-apathy.html)

      * [How to Punish
      Voters](https://www.nytimes.com/2018/10/31/opinion/election-voting-rights-fraud-prosecutions.html)

      * [Broken machines, rejected ballots and long lines: voting problems
      emerge as Americans go to the
      polls.](https://www.washingtonpost.com/politics/broken-machines-rejected-ballots-and-long-lines-voting-problems-emerge-as-americans-go-to-the-polls/2018/11/06/ffd11e52-dfa8-11e8-b3f0-62607289efee_story.html)
    _template: richText
excerpt: >
  This week, I updated my James Reads site to use Gatsby, powered by a
  combination of Pocket & the WordPress site that currently resides on that
  domain. I do a lot of reading on Pocket, and I’ve been meaning to figure out a
  way to display both Pocket- & WP-saved links there. Initially, that was \[…]
featuredMedia: content/media/links.md
_template: standard
---

