---
description: Git-to-SVN Plugin Deploy by Scribu
status: publish
gistId: none
sync: false
createdAt: '2015-02-10T22:55:36.000Z'
updatedAt: '2015-02-10T22:55:36.000Z'
blobs:
  - filename: plugin-deploy.sh
    code: "#!/usr/bin/env bash\n\n# args\nMSG=${1-'deploy from git'}\nBRANCH=${2-'trunk'}\n\n# paths\nSRC_DIR=$(git rev-parse --show-toplevel)\nDIR_NAME=$(basename $SRC_DIR)\nDEST_DIR=~/svn/$DIR_NAME/$BRANCH\n\n# build first\nif [ -f \"$SRC_DIR/bin/build\" ]; then\n\t$SRC_DIR/bin/build\nfi\n\n# make sure we're deploying from the right dir\nif [ ! -d \"$SRC_DIR/.git\" ]; then\n\techo \"$SRC_DIR doesn't seem to be a git repository\"\n\texit\nfi\n\n# make sure the destination dir exists\nmkdir -p $DEST_DIR\nsvn add $DEST_DIR 2> /dev/null\n\n# delete everything except .svn dirs\nfor file in $(find $DEST_DIR/* -type -f -and -not -path \"*.svn*\")\ndo\n\trm $file\ndone\n\n# copy everything over from git\nrsync --recursive --exclude='*.git*' $SRC_DIR/* $DEST_DIR\n\ncd $DEST_DIR\n\n# check .svnignore\nfor file in $(cat \"$SRC_DIR/.svnignore\" 2> /dev/null)\ndo\n\trm -rf $DEST_DIR/$file\ndone\n\n# Transform the readme\nif [ -f README.md ]; then\n\tmv README.md readme.txt\n\tsed -i '' -e 's/^# (.*)$/=== 1 ===/' -e 's/ #* ===$/ ===/' -e 's/^## (.*)$/== 1 ==/' -e 's/ #* ==$/ ==/' -e 's/^### (.*)$/= 1 =/' -e 's/ #* =$/ =/' readme.txt\nfi\n\n# svn addremove\nsvn stat | awk '/^?/ {print $2}' | xargs svn add > /dev/null 2>&1\nsvn stat | awk '/^!/ {print $2}' | xargs svn rm --force\n\nsvn stat\n\nsvn ci -m \"$MSG\"\n"
    language: bash
  - filename: plugin-tag.sh
    code: "#!/bin/bash\n\nif [ $# -lt 1 ]; then\n\techo 'usage: plugin-tag 1.2.3'\n\texit\nfi\n\nTAG_NAME=$1\n\ngit tag $TAG_NAME\ngit push\ngit push --tags\n\nplugin-deploy \"tagging version $TAG_NAME\" tags/$TAG_NAME"
    language: bash
---

