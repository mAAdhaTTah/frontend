---
description: Mount Arbitrary Directory with bedrock-ansible
status: publish
gistId: none
sync: true
createdAt: '2015-04-11T15:41:06.000Z'
updatedAt: '2015-04-11T15:41:06.000Z'
blobs:
  - filename: vagrantfile
    code: |-
      config.vm.synced_folder '../themes/sage', File.join(nfs_path(name), 'web/app/themes/sage'), type: 'nfs'
    language: ruby
---

