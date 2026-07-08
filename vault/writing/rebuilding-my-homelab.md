---
tags:
  - web
  - effort
parent: "[Homelab](/vault/writing/homelab.md)"
slug: writing/rebuilding-my-homelab
title: Rebuilding my homelab
description: My plan for rebuilding my homelab
published_at: 2026-02-01 11:32
updated_at: 2026-07-07 11:32
share: true
intensity: complete
rank: 3
---

# Rebuilding my homelab

I had a number of issues in the homelab, which I wanted to solve through some expansion of the computers in the homelab and take the opportunity to combine everything into one big swarm. We also better managed the data storage across the new machines, putting most things on the primary fileserver (currently named icanhazmedia), but with some things on the local SSDs.

The rebuild didn't fully solve all of them, but I made enough progress to make some significant improvements. The core of the rebuild was the introduction of 5 mini PCs. I bought these from someone on Facebook Marketplace, who had a slew of them he got from a business that was liquidating them. I got 5 for $60/ea ($300), and we verified all 5 at his place before I took them home.

I installed Ubuntu on all 5, stood up Docker on each of them, and integrated 3 of them into a single Docker swarm. I then tore down the swarms on the existing servers (Nexus & icanhazmedia) and added them to the swarm as worker nodes. I did a bunch of configuration of all of the stacks to put most things in the 3 mini PCs, while pinning the rest to specific servers. Gitea, zerobyte, & pi-hole all stayed on nexus; Plex, nzbget, & databasus stayed on icanhazmedia, and the rest floated on the 3 node core of the swarm.

For the 4th mini PC, I moved all of the databases onto that node. That's a postgres instance, a MariaDB instance, and MongoDB instance. This sounds like a lot, but it actually doesn't really max out the CPU that much. For the last node, I actually wanted to make that an AI workspace. My original idea was to put Claude Code into a docker container running in tmux so I could attach to it and let long-running tasks proceed. However, I quickly realized that was going to be... annoying. If I'm on a machine, what's the point of putting it on a remote machine when my local machine works so well? So I instead built it out as an autonomous agent that interacts with my gitea instance to do work.

This has proven to be surprisingly effective! It's nice to be able to open an issue on a side project and wake up the next morning with a PR review. It's taking a bit of tuning to get it to a place, and I really need to get a UI going on it so I can better interact with the agent more directly. However, so fact, everything has worked pretty well and I've been able to make a lot more progress on my side projects than I otherwise might have.

The mini PCs are just stacked on top of the nexus server, so I didn't really do the rack that I was hoping to do. However, this did clean up a bunch of issues and gave me a bunch more computing power to play with.

## Issues

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
- No backup of media server
  - Following the 3-2-1 backup strategy, we backup to either a 4 drive external bay for a single 8TB disk
    - Bay for stuff we care about, disk for stuff we care less about
  - Backblaze for offsite backup
- No shared data across multiple machines
  - Going to use NFS for less volatile storage, something else for more volatile storage
    - If NFS isn't the answer for an all-Linux setup, what is
  - Right now, using sammonsempessyncthing4swarm Automated deployment solution for running Syncthing in Docker Swarm clusters. Simplifies installation and management of distributed file synchronization across containerized infrastructures. which works ok

## Goals

- Support SQLite-driven applications
  - This means NFS won't be a good fs for these applications
  - Those applications include:
    - Archivebox
    - Plex
    - \*arr stack
  - Solution: Use sammonsempessyncthing4swarm Automated deployment solution for running Syncthing in Docker Swarm clusters. Simplifies installation and management of distributed file synchronization across containerized infrastructures. to synchronize files live
    - We only synchronize between the mini PCs
- Backup my media
  - I only currently back up "important" things (photos, documents, etc) but would like to expand that to my media server
  - Solution: Backblaze with Zerobyte to create restic backups
    - Backblaze isn't crazy expensive, restic's compression is really good
    - I also have enough
- Redundant swarm
  - Multiple manager nodes that can shift applications around seamlessly
  - This should include being able to shift SQLite applications
  - Solution: 3 minipc nodes

## Components

- 5 HP EliteDesk MiniPCs
  - These are running i5 CPUs, 8GB of RAM, 256GB SSD
