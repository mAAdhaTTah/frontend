---
tags:
  - web
  - snippet
title: Mount Arbitrary Directory with bedrock-ansible
description: ""
slug: gistpens/mount-arbitrary-directory-with-bedrock-ansible
published_at: 2015-04-11T15:41:06.000Z
updated_at: 2015-04-11T15:41:06.000Z
share: true
---

```ruby title="vagrantfile"
config.vm.synced_folder '../themes/sage', File.join(nfs_path(name), 'web/app/themes/sage'), type: 'nfs'
```

^vagrantfile
