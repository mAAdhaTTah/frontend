---
description: Upgrade npm to latest/bleeding
status: publish
gistId: none
sync: false
createdAt: '2014-09-28T15:03:23.000Z'
updatedAt: '2014-09-28T15:03:23.000Z'
blobs:
  - filename: npm-upgrade-bleeding.sh
    code: |-
      #!/bin/sh

      set -e
      set -x

      for package in $(npm -g outdated --parseable --depth=0 | cut -d: -f3)
      do
          npm -g install "$package"
      done
    language: bash
  - filename: npm-upgrade.sh
    code: |-
      #!/bin/sh

      set -e
      set -x

      for package in $(npm -g outdated --parseable --depth=0 | cut -d: -f2)
      do
          npm -g install "$package"
      done
    language: bash
  - filename: update.sh
    code: |-
      source <(curl -fsSL
      https://gist.githubusercontent.com/mAAdhaTTah/49c2e59eda85f37b325f/raw/4ead4c8989c66104a22240819131b99295bc4e37/npm-upgrade.sh)
    language: bash
---

