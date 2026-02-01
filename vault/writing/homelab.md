---
tags:
  - effort
  - concept
  - web
parent: "[[Household]]"
intensity: simmering
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

When I set this up, I didn't network this media server with the original HP server, so both servers had their own instances of Traefik, Portainer, etc. running on them. I also didn't have a great mechanism for updating versions. I used [WUD](/vault/links/wud.md) to track versions, which I then manually updated in my Ansible configuration and reran the deployment to pull the new version. All of these issues prompted me to start looking at [Rebuilding my homelab](/vault/writing/rebuilding-my-homelab.md).

## References

- Building My First Homelab Server Rack

## ZFS pool setup

```bash title="zfs-setup"
2023-01-01.21:29:11 zpool create -o ashift=12 -m /var/local media raidz2 /dev/sdb /dev/sdc /dev/sdd /dev/sde
2023-01-01.21:29:12 zpool export media
2023-01-01.21:30:06 zpool import -d /dev/disk/by-id media
2023-01-01.21:30:43 zfs set xattr=sa media
2023-01-01.21:30:48 zfs set acltype=posixacl media
2023-01-01.21:30:53 zfs set compression=lz4 media
2023-01-01.21:30:57 zfs set atime=off media
2023-01-01.21:31:00 zfs set relatime=off media
```

## Related Concepts

- 3-2-1 backup strategy
- Backup software
- Offsite backups
