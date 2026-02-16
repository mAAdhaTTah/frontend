---
tags:
  - web
  - effort
parent: "[[Homelab]]"
slug: writing/rebuilding-my-homelab
title: Rebuilding my homelab
description: My plan for rebuilding my homelab
published_at: 2026-02-01 11:32
updated_at: 2026-02-01 11:32
share: true
intensity: on
rank: 3
---

# Rebuilding my homelab

https://www.reddit.com/r/homelab/comments/1qqaoy8/homelab_revamp_storage_suggestions/

![8p-front-2026-01-31.png](/vault/_meta/attachments/8p-front-2026-01-31.png.png)

Rack from [Rackula - Rack Layout Designer](/vault/links/rackula-rack-layout-designer.md.md). Currently aspirational, not yet implemented.
[Link](https://count.racku.la/?l=eJyNkcFugzAMhl8FZZdOIl2hDCi3dNW0yyS0aqeqB0ZDQaIQhTAmId59bgINTEzbBeLfn387Tos-UYBWS2-5RiYq4OwzOHAUtDpKUWDZJmrgtzHRCQWHFglIWjXmZS0ox0nGaRPlOcBMwQnkP0qRos5U8JkWlGcxvmRFhlnck5YiE14W4g909W90M0faDmYlF5hFIk7hW9B-WneWrnElSh6dad995kZwfXaqVf5xzgSANMoTXDUZ9FSgNwGPHexTyIVWs7dJZesL5F5BM8In0GKI7hziEZ9A9AVRJVtWvz2JNnmTuYdnnZNm3tbdEr83K25mkyWAia1M9jdNFq93HnGGScR4ErUd3T3cvQ9FxHd0UaM7zj7SyOGqG-FVNxYAhwDfD56u7dnE6T3ZeJDpK2i7F9CNvdSNhT91-7mTY_cNFZrkAA)

## Current Issues

- No shared data across multiple machines
  - If NFS isn't the answer for an all-Linux setup, what is
- No backup of media server
  - Want to follow the 3-2-1 backup strategy

## Resolved Issues

- ArchiveBox doesn't kill Chromium correctly so it sucks up all of the memory and locks up the server
  - This is technically still open but should be resolved in the latest version of Archivebox
  - That version is currently under development, so we haven't upgraded yet though
- Portainer runs on both servers independently
  - We migrated to Komodo
  - We have not yet but will deploy the periphery agent to all servers
- Docker services are managed with Ansible
  - This was also resolved by the migration to Komodo
  - The nexus server is deployed with Ansible, but everything else is deployed with Komodo
- Running two independent swarms
  - As part of the migration to Komodo, we integrated all of the servers into a single swarm

## Goals

- Support SQLite-driven applications
  - This means NFS won't be a good fs for these applications
  - Those applications include:
    - Archivebox
    - Plex
  - Solution: Ceph FS for the volatile data
    - Every node on the swarm will have an SSD for the OS and a separate SSD dedicate to Ceph
    - Alt: Use [LINBIT/csync2](/vault/links/linbitcsync2-file-synchronization-tool-using-librsync-and-current-state-databases.md.md) to synchronize files live and run the instance on a single node
      - This might be easier to get started with until I open up one of the minipcs and take a look
  - Question: Does this include the fileserver?
- Massive, expandable filestorage
  - Current storage needs are close to 20TB
    - Have an array with another 20TB spare
    - I want to be able to continue to expand it
  - Solution: dedicated fileserver with 8 HDD bays minimum
  - Question: Should this node be on the swarm or should it be a pure fileserver?
  - Question: What other pathways to expansion should I consider besides max bays up front?
- Backup my media
  - I only currently back up "important" things (photos, documents, etc) but would like to expand that to my media server
  - Solution: ???
  - Question: Where/how can I do this that doesn't cost an intense amount of money?
- Redundant swarm
  - Multiple manager nodes that can shift applications around seamlessly
  - This should include being able to shift SQLite applications
  - Solution: 3 minipc nodes with SSD for OS + SSD for Ceph
  - Question: What component should I purchase for this?
- Support media server
  - At least one node that's powerful enough to transcode video
  - Question: Are the minipcs going to work for this as-is? They might.

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

## Components

- 5 HP EliteDesk MiniPCs
  - These are running i5 CPUs, 8GB of RAM, 256GB SSD
  - The goal is to set them up as a single cluster
  - I have not yet decided whether/how to configure Ceph
- Rest of the components is still being determined
  - For now, I'm running what was previously my media server as the fileserver + databases
  - Anything that runs SQLite will run off that machine
  - I may also consider [LINBIT/csync2](/vault/links/linbitcsync2-file-synchronization-tool-using-librsync-and-current-state-databases.md.md) instead of Ceph, as it would require fewer drives
