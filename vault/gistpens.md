---
tags:
  - view
  - web
slug: gistpens
title: Gistpens
description:
published_at: 2025-07-27 11:37
updated_at: 2025-07-27 11:37
share: true
---
```datacorejsx
const View = () => {
    const pages = dc.useQuery(`@page and #snippet`);
    
    return <dc.List rows={pages} renderer={page => page.$link} />;
};

return View;
```