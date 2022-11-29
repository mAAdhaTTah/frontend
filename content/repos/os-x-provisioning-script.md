---
description: OS X Provisioning Script
status: publish
gistId: 68926f3182b70a662c48
sync: false
createdAt: '2015-11-20T00:00:10.000Z'
updatedAt: '2018-05-12T15:30:59.000Z'
blobs:
  - filename: provision-osx.sh
    code: >-
      cd /tmp

      git clone https://github.com/mAAdhaTTah/tea-party.git

      cd tea-party

      ./invite


      sudo gem install homesick

      homesick clone https://github.com/mAAdhaTTah/dotfiles

      homesick link dotfiles


      mackup restore


      python -c "$(curl -fsSL
      https://raw.githubusercontent.com/fix-macosx/fix-macosx/master/fix-macosx.py)"
    language: bash
commits:
  - committedAt: '2018-05-12T19:30:59.000Z'
    description: OS X Provisioning Script
    blobs:
      - filename: provision-osx.sh
        code: >-
          cd /tmp

          git clone https://github.com/mAAdhaTTah/tea-party.git

          cd tea-party

          ./invite


          sudo gem install homesick

          homesick clone https://github.com/mAAdhaTTah/dotfiles

          homesick link dotfiles


          mackup restore


          python -c "$(curl -fsSL
          https://raw.githubusercontent.com/fix-macosx/fix-macosx/master/fix-macosx.py)"
        language: bash
---

