---
title: "プロジェクトごとに使用する Rust のバージョンを指定する"
created: "2022-01-12"
path: "/20220112-rust-version-each-project"
eyecatcher: "./eyecatcher.png"
tags: ["Rust"]
category: "Tech"
---

```bash
# 使いたいバージョンの rust をインストールする
$ rustup install 1.51.0

# プロジェクトルートに rust-toolchain ファイルを置く
$ touch rust-toolchain
$ echo "1.51.0" > rust-toolchain

# バージョンが指定されているかどうか確認する
$ rustc -V
rustc 1.51.0 (2fd73fabe 2021-03-23)
```

FYI: [The rustup book](https://rust-lang.github.io/rustup/concepts/toolchains.html)