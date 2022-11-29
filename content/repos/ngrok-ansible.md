---
description: Ngrok & Ansible
status: publish
gistId: none
sync: false
createdAt: '2015-03-07T16:34:49.000Z'
updatedAt: '2015-03-07T16:34:49.000Z'
blobs:
  - filename: group_vars/development
    code: |-
      ngrok:
        subdomain: domain
        token: your_token
    language: plaintext
  - filename: site.yml
    code: '- { role: ngrok, tags: [ngrok], when: "''development'' in group_names"  }'
    language: plaintext
---

