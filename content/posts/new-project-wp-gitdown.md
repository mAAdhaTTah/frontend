---
title: 'New Project: WP-Gitdown'
publishedAt: '2014-02-03T15:46:35.000Z'
updatedAt: '2022-12-07T14:37:42.000Z'
menu: content/menus/main.md
header: content/headers/main.md
status: publish
body:
  - content: >
      Over the weekend, I finally started working on an idea I had, borne out of
      Ben Balter's [GitHub for
      Journalism](http://ben.balter.com/2012/02/28/github-for-journalism-what-wordpress-post-forking-could-do-to-editorial-workflows/)
      post and the resulting [Post
      Forking](https://github.com/post-forking/post-forking) plugin. While this
      is an awesome idea, there were some problems I had using it myself:


      1. I have concerns with forking the posts within the database and
      potential problems with merging there\[1. Although admittedly that's
      partially a result of my lack of experience with WordPress as well as not
      taking a particularly close look at their plugin.]

      2. I wanted .md copies of my posts anyway for backup


      Overall, it's a great project; I don't mean to throw shade on their work.
      However, they do basically have to rebuild Git's functionality within a
      WordPress context, including the database interactions and whathaveyou,
      and it looks like a lot of work to make sure it works correctly.


      Instead of that, WP-Gitdown exports the posts as Markdown files, commit
      them to an actual Git repo, which gets pushed and pulled to from GitHub
      and read from when you update a post. This avoids the need to build the
      forking functionality within WordPress.


      I got the project started this weekend, and currently it so far has a
      button that exports all the posts to .md files and commits them to a repo.
      When I've got some more basic functionality (and less errors), I'll be
      putting this up on GitHub for contributions.
    _template: richText
excerpt: >
  Over the weekend, I finally started working on an idea I had, borne out of Ben
  Balter’s GitHub for Journalism post and the resulting Post Forking plugin.
  While this is an awesome idea, there were some problems I had using it myself:
  I have concerns with forking the posts within the database and potential
  problems \[…]
featuredMedia: content/media/wordpress-blogging-software-logo.md
categories:
  - reference: content/categories/technology.md
_template: standard
---


