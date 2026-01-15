---
tags:
  - snippet
  - web
slug: gistpens/delete-all-branches-in-repo
title: Delete all branches in repo
description: Bash script to delete all of the non-main branches in a local report.
published_at: 2026-01-14 19:15
updated_at: 2026-01-14 19:15
share: true
---

```bash title="delete-branches.sh"
#!/bin/bash
MAIN_BRANCH="main"
git checkout "$MAIN_BRANCH" 2>/dev/null || git checkout master
git for-each-ref --format '%(refname:short)' refs/heads/ | while read branch; do
  if [ "$branch" != "$MAIN_BRANCH" ]; then
    git branch -d "$branch" 2>/dev/null || git branch -D "$branch"
  fi
done
```

^delete-branches-sh
