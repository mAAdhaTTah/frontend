---
tags:
  - effort
  - concept
  - web
parent: "[[Household]]"
intensity: ongoing
rank: 4
previous:
next:
slug: writing/homelab
title: Homelab
description: Running & managing a homelab
published_at: 2026-02-01 11:33
updated_at: 2026-02-01 11:33
share: true
---

# Homelab

My homelab has evolved a lot over the years. It started with a pretty basic HP ProLiant G7 N54L, which I bought back in 2013, and for the longest time, that was the entire thing. As I got more experience with Ansible, I moved the deployment & configuration of that server into it. From there, as Docker & containers took over the industry, I moved the applications into it, using Ansible to deploy the services.

Over time, the number of services expanded until that little machine couldn't really handle it well. I took an old desktop out of storage, bought some large HDDs for it, and set it up as a media server. I expanded the services on it beyond plex, adding the \*arr stack for media requests and moving some of the other media apps over (e.g. calibre).

When I set this up, I didn't network this media server with the original HP server, so both servers had their own instances of Traefik, Portainer, etc. running on them. I also didn't have a great mechanism for updating versions. I used [WUD](/vault/links/wud.md.md) to track versions, which I then manually updated in my Ansible configuration and reran the deployment to pull the new version. All of these issues prompted me to start looking at [Rebuilding my homelab](/vault/writing/rebuilding-my-homelab.md.md).

## Naming Scheme

- unicomplex - fileserver (currently called icanhazmedia)
- nexus - white desktop, hosts gitea + runner
- queen - first swarm node
- drone-01 to -04 - additional swarm nodes
- primary-adjunct - local backup server
- unimatrix-zero - offsite backup

## References

- Building My First Homelab Server Rack

## Plex configuration

- Big Media folder Make smaller video preview thumbnails - General Discussions  Tips, Tricks & How-Tos

## ZFS pool setup

```bash title="zfs-setup"
zpool create -o ashift=12 -m <mountpoint> <poolname> raidz2 <...disk>
zpool export <poolname>
zpool import -d /dev/disk/by-id <poolname>
zfs set xattr=sa <poolname>
zfs set acltype=posixacl <poolname>
zfs set compression=lz4 <poolname>
zfs set atime=off <poolname>
zfs set relatime=off <poolname>
```

## Related Concepts

- 3-2-1 backup strategy
- Backup software
- Offsite backups
