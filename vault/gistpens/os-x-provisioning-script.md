---
tags:
  - web
  - snippet
title: OS X Provisioning Script
description: ""
slug: gistpens/os-x-provisioning-script
published_at: 2015-11-20T00:00:10.000Z
updated_at: 2018-05-12T15:30:59.000Z
share: true
---

```bash title="provision-osx.sh"
cd /tmp
git clone https://github.com/mAAdhaTTah/tea-party.git
cd tea-party
./invite

sudo gem install homesick
homesick clone https://github.com/mAAdhaTTah/dotfiles
homesick link dotfiles

mackup restore

python -c "$(curl -fsSL https://raw.githubusercontent.com/fix-macosx/fix-macosx/master/fix-macosx.py)"
```

^provision-osx-sh
