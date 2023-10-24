#!/bin/bash

CREATED=$(date '+%Y%m%d')
CREATED_HYPHEN=$(date '+%Y-%m-%d')
SCRIPT_DIR=$(cd $(dirname $0); pwd)

read -p 'Enter post title: ' title
if [ -z "$title" ]; then
  echo "Title required"
  exit 1
fi

read -p 'Enter post slug: ' slug
if [ -z "$slug" ]; then
  echo "Slug required"
  exit 1
fi

mkdir -p "./src/contents/${CREATED}-${slug}"
cd $_

cat << EOT >> index.md
---
title: "$title"
created: "$CREATED_HYPHEN"
path: "/${slug}"
eyecatcher: "../../images/barleytea.png"
tags: []
---

```toc
```
EOT
