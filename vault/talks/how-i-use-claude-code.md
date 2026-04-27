---
tags:
  - web
  - talk
slug: talks/how-i-use-claude-code
title: How I use Claude Code
description: Sharing with my coworkers how I've been using Claude Code
published_at: 2026-04-24 16:30
updated_at: 2026-04-24 16:30
share: true
---

# How I Use Claude Code

---

## Agenda

- Background on the project
- Overview of the workflow
- Walkthrough of example
- Closing thoughts

---

## Background on the project

[HoldMyCal.com](https://holdmycal.com/)

Want to block personal time on work calendars? Use HoldMyCal!

_Note: Currently broken because I used up my free Neon tier 😭._

---

## Overview of the workflow

- [Sourced primarily from Superpowers](https://github.com/obra/superpowers)
- Personal version hosted on my Gitea instance

---

### New feature development

1. Share initial description of the feature
2. Agent does some research, asks questions, clarifies intent
3. Agent produces design spec, pushes to Gitea for review
4. I review the spec and ask for updates until its approved
5. Agent produces implementation plan, pushes to Gitea for review
6. I review the plan and ask for updates until its approved & merged
7. Agent spins up subagents

---

Definitely some room for efficiency

- Do we need to keep the implementation plan?
- Do we need separate PRs for everything?
- Should we clear the context before starting implementation?

But this is the workflow as it currently stands.

---

## Walkthrough of example

- [Initial spec](https://git.8p.jamesdigioia.com/mAAdhaTTah/cal-timeblock-sync/pulls/91)
- [Implementation](https://git.8p.jamesdigioia.com/mAAdhaTTah/cal-timeblock-sync/pulls/107)

---

## Closing thoughts

- This has gotten a lot better than the last few times I played with this stuff
- Can still easily go off the rails, I'm already experiencing weird behaviors
- Context rot is real, even on small projects; not sure how the webhook registration works
- Has motivated me to build more, working on homelab + other side projects
