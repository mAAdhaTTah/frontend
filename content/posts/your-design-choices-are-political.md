---
title: Your design choices are political
publishedAt: '2015-01-05T17:57:56.000Z'
updatedAt: '2015-01-05T17:57:56.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: publish
body:
  - content: >
      I spent much of the holidays working on getting WP-Gistpen completed
      enough for a beta release.<FootnoteReference id="1" /> One of the features
      that's going to make this release awesome is interoperability with Gist.
      Since I'm basically building a Gist clone, I want it to be as easy as
      possible to migrate from Gist -> Gistpen, and I'm working pretty hard on
      ensuring data fidelity so the migration is as smooth as possible and you
      lose as little as possible in the process.<FootnoteReference id="2" />


      One of the questions this raised was about defaults: Should new Gistpens
      sync to Gist by default? Setting defaults in applications is super
      important; making something opt-in vs opt-out makes a huge difference in
      participation rates, from big things, [like organ
      donation](http://www.nytimes.com/2009/09/27/business/economy/27view.html),
      to small things, like syncing your Gistpens. So a decision to make it sync
      *by default* actually is going to have a big impact on user behavior.


      The [founding philosphy](https://jamesdigioia.com/new-project-wp-gistpen/)
      behind Gistpen was to start the process of pulling all my data into a
      [space I
      own](https://jamesdigioia.com/thread/the-case-for-our-digital-space/).
      Because the tool's philosophy is political in nature, it's easy to see how
      particular design choices are shaped by those politics and values. The
      whole purpose is political, so every choice related to that purpose is
      political, which means I can't look at the decision simply as "What would
      my users prefer?", if such a question could even be answered, but "What
      kind of a world do I want to live in?"


      Granted, this sounds super grandstand-y when applied to something minor
      like this, but it's a point of view that often goes missed when designing
      technology. Every design choice you make is a political one; when you're
      guiding your users towards a certain habit or mode of operating, you're
      not merely giving them options but shaping the world in which they live.


      <ExtendedQuote>
        Technology is neither good nor bad; *nor is it neutral*. -- Melvin Kranzberg
      </ExtendedQuote>


      When I finally decided to default syncing to "off" (except after you've
      explicitly exported your Gistpens to Gist), I recognize that as a
      deliberate political choice: The default is to *not share*, to maintain
      control over your data and *only share it if you explicitly decide to do
      so*.


      This wasn't an ease-of-use decision, or even a question of user
      expectations. It was saying "You decide when your data goes out to another
      service, and only after you give your say-so."


      And that's a political choice, and I think we as technologists and
      developers don't look at our design decisions that way. We look at
      databases and figure out the optimal way of storing that data without
      thinking about what data we're storing, why we're storing that data, and
      the political implications of collecting that data. We look at a
      male/female designation on a sign-up form as a simple question without
      considering the social implications of forcing our users into that binary.
      Or even the political implications of \[launching without blocking
      tools]\[4] and what that says about our priorities.


      Technologists have done an excellent job at building an ideology that
      denies it's an ideology, but every design choice you make is an
      ideological one. We'd make much better choices if we considered them in
      that light.


      <FootnoteDefinition id="1">
        As an aside, if you're a developer who has a WordPress site where they would like to host their code snippets who's currently using Gist, please contact me. I need beta testers!
      </FootnoteDefinition>


      <FootnoteDefinition id="2">
        Also a political decision, in some sense. You shouldn't lose some of your data in the process of transitioning to your self-owned tools.
      </FootnoteDefinition>
    _template: richText
excerpt: >
  I spent much of the holidays working on getting WP-Gistpen completed enough
  for a beta release.1 One of the features that’s going to make this release
  awesome is interoperability with Gist. Since I’m basically building a Gist
  clone, I want it to be as easy as possible to migrate from Gist -> Gistpen,
  and I’m \[…]
featuredMedia: content/media/internet-on-a-bike-statue.md
_template: standard
---

