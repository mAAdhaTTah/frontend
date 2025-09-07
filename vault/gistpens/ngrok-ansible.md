---
tags:
  - web
  - snippet
title: Ngrok & Ansible
description: ""
slug: gistpens/ngrok-ansible
published_at: 2015-03-07T16:34:49.000Z
updated_at: 2015-03-07T16:34:49.000Z
share: true
---

```yaml title="requirements.yml"
- name: ngrok
  src: mAAdhaTTah.ngrok
```

^requirements-yml

```yaml title="dev.yml"
- { role: ngrok, tags: [ngrok] }
```

^dev-yml

```yaml title="group_vars_development"
ngrok:
  subdomain: domain
  token: your_token
```

^group_vars_development
