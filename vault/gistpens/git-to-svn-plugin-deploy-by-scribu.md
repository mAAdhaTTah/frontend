---
tags:
  - web
  - snippet
title: Git-to-SVN Plugin Deploy by Scribu
description: ""
slug: gistpens/git-to-svn-plugin-deploy-by-scribu
published_at: 2015-02-10T22:55:36.000Z
updated_at: 2015-02-10T22:55:36.000Z
share: true
---

```bash title="plugin-deploy.sh"
#!/usr/bin/env bash

# args
MSG=${1-'deploy from git'}
BRANCH=${2-'trunk'}

# paths
SRC_DIR=$(git rev-parse --show-toplevel)
DIR_NAME=$(basename $SRC_DIR)
DEST_DIR=~/svn/$DIR_NAME/$BRANCH

# build first
if [ -f "$SRC_DIR/bin/build" ]; then
	$SRC_DIR/bin/build
fi

# make sure we're deploying from the right dir
if [ ! -d "$SRC_DIR/.git" ]; then
	echo "$SRC_DIR doesn't seem to be a git repository"
	exit
fi

# make sure the destination dir exists
mkdir -p $DEST_DIR
svn add $DEST_DIR 2> /dev/null

# delete everything except .svn dirs
for file in $(find $DEST_DIR/* -type -f -and -not -path "*.svn*")
do
	rm $file
done

# copy everything over from git
rsync --recursive --exclude='*.git*' $SRC_DIR/* $DEST_DIR

cd $DEST_DIR

# check .svnignore
for file in $(cat "$SRC_DIR/.svnignore" 2> /dev/null)
do
	rm -rf $DEST_DIR/$file
done

# Transform the readme
if [ -f README.md ]; then
	mv README.md readme.txt
	sed -i '' -e 's/^# (.*)$/=== 1 ===/' -e 's/ #* ===$/ ===/' -e 's/^## (.*)$/== 1 ==/' -e 's/ #* ==$/ ==/' -e 's/^### (.*)$/= 1 =/' -e 's/ #* =$/ =/' readme.txt
fi

# svn addremove
svn stat | awk '/^?/ {print $2}' | xargs svn add > /dev/null 2>&1
svn stat | awk '/^!/ {print $2}' | xargs svn rm --force

svn stat

svn ci -m "$MSG"

```

^plugin-deploy-sh

```bash title="plugin-tag.sh"
#!/bin/bash

if [ $# -lt 1 ]; then
	echo 'usage: plugin-tag 1.2.3'
	exit
fi

TAG_NAME=$1

git tag $TAG_NAME
git push
git push --tags

plugin-deploy "tagging version $TAG_NAME" tags/$TAG_NAME
```

^plugin-tag-sh
