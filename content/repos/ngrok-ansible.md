---
description: Ngrok & Ansible
status: publish
gistId: none
sync: false
createdAt: '2015-03-07T16:34:49.000Z'
updatedAt: '2015-03-07T16:34:49.000Z'
blobs:
  - filename: requirements.yml
    code: |-
      - name: ngrok
        src: mAAdhaTTah.ngrok
    language: yaml
  - filename: dev.yml
    code: '- { role: ngrok, tags: [ngrok] }'
    language: yaml
  - filename: group_vars/development
    code: |-
      ngrok:
        subdomain: domain
        token: your_token
    language: yaml
---

