---
tags:
  - effort
  - web
parent: "[Homelab](/vault/writing/homelab.md)"
intensity: sleeping
rank: 2
slug: writing/rackify-my-homelab
title: Rackify my homelab
description: My plan to move my mess of a homelab into a rack.
published_at: 2026-07-07 21:45
updated_at: 2026-07-07 21:45
share: true
---

# Rackify my homelab

https://www.reddit.com/r/homelab/comments/1qqaoy8/homelab_revamp_storage_suggestions/

![8p-front-2026-01-31.png](/vault/_meta/attachments/8p-front-2026-01-31.png)

Rack from [Rackula - Rack Layout Designer](/vault/links/rackula-rack-layout-designer.md). Currently aspirational, not yet implemented.
[Link](https://count.racku.la/?l=eJyNkcFugzAMhl8FZZdOIl2hDCi3dNW0yyS0aqeqB0ZDQaIQhTAmId59bgINTEzbBeLfn387Tos-UYBWS2-5RiYq4OwzOHAUtDpKUWDZJmrgtzHRCQWHFglIWjXmZS0ox0nGaRPlOcBMwQnkP0qRos5U8JkWlGcxvmRFhlnck5YiE14W4g909W90M0faDmYlF5hFIk7hW9B-WneWrnElSh6dad995kZwfXaqVf5xzgSANMoTXDUZ9FSgNwGPHexTyIVWs7dJZesL5F5BM8In0GKI7hziEZ9A9AVRJVtWvz2JNnmTuYdnnZNm3tbdEr83K25mkyWAia1M9jdNFq93HnGGScR4ErUd3T3cvQ9FxHd0UaM7zj7SyOGqG-FVNxYAhwDfD56u7dnE6T3ZeJDpK2i7F9CNvdSNhT91-7mTY_cNFZrkAA)

## Goals

- Massive, expandable filestorage
  - Current storage needs are close to 20TB
    - Have an array with another 20TB spare
    - I want to be able to continue to expand it
  - Solution: dedicated fileserver with 8 HDD bays minimum
  - Question: Should this node be on the swarm or should it be a pure fileserver?
  - Question: What other pathways to expansion should I consider besides max bays up front?
- Support media server
  - At least one node that's powerful enough to transcode video
  - Question: Are the minipcs going to work for this as-is? They might.
    - For now, I'll probably just run this off whatever my fileserver is

## Plan

- Fileserver
  - 8+ bays
  - OS on one SSD + 2nd ssd for Ceph
  - Otherwise, mostly avoid running software on this server
    - Exception: backup software
    - Do we need an exception for anything SQLite driven?
- Primary swarm
  - 3-5 minipcs
  - 1 SSD for the OS + 1 SSD for Ceph
  - This will be able to run everything else
