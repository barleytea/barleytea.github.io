---
title: "MacBook Pro (14-inch, 2021) M1 Max 初期設定メモ"
created: "2022-01-22"
path: "/mac-setting-2021-m1"
eyecatcher: "../../images/barleytea.png"
tags: ["MacOS", "dotfiles"]
---

## Rosetta 2

```bash
$ softwareupdate --install-rosetta
```

## dotfiles

https://github.com/barleytea/dotfiles

```bash
$ cd git_repos
$ git clone https://github.com/barleytea/dotfiles.git
$ cd dotfiles
$ make deploy # dotfiles から HOME に symbolic link をはる
$ make install # brew intall とか色々やる
```

## fish

下記の手順で fish をデフォルトシェルにしてから`$ fisher insall hoge`すると、`fish: Unknown command: fish`とか怒られて plugin の install に失敗した。M1 絡みで brew の install path が変わったことが何か悪さしていると予想しているけれど、はっきりとは分からない。要調査。

```bash
### うまくいかなかった手順

$ which fish # intel mac とは違う path に install されている
/opt/homebrew/bin/fish

$ sudo vi /etc/shells
/bin/bash
/bin/csh
/bin/dash
/bin/ksh
/bin/sh
/bin/tcsh
/bin/zsh
/opt/homebrew/bin/fish # これを追加する

$ chsh -s /opt/homebrew/bin/fish # fish を default shell に
```

これを機に、default shell を fish にするのをやめて、Zsh から fish を起動するようにした。とりあえず私の環境では以下で全て解決。

```bash
# .zshrc の末尾に以下を追記
if [[ -o interactive ]]; then
    exec fish
fi
```

## Docker

[Docker Desktop for Mac by Docker | Docker Hub](https://hub.docker.com/editions/community/docker-ce-desktop-mac/)

## Rust

[Rust をインストール](https://www.rust-lang.org/ja/tools/install)

```bash
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

## Flutter

[macOS install](https://docs.flutter.dev/get-started/install/macos)

## Java

M1 対応の JDK を配布してくれているので以下からダウンロードしてみた。

[Downloads](https://www.azul.com/downloads/?version=java-17-lts&os=macos&architecture=arm-64-bit&package=jdk)

## その他設定

### System Preferences

#### コンピュータ名変更

- System Preferences > Sharing > Computer Name

#### トラックパッドで「３本指ドラッグ」を有効化

- System Preferences > Accessibility > Pointer Control > Trackpad Options > Enable dragging > three finger drag

#### キーボード関連

- Key Repeat
    - System Preferences > Keyboard > Key Repeat を Fast に
- Delay Until Repeat
    - System Preferences > Keyboard > Delay Until Repeat を Short に
- Caps を Control に割り当て直す
    - System Preferences > Keyboard > Modifier Keys > Caps Lock を Control に

#### Mission Control

- System Preferences > Mission Control > Automatically rearrange Spaces based on most recent use のチェックを外す

#### Apple Watch で Mac のロックを解除できるようにする

- System Preferences > Security & Privacy > General > Use your Apple Watch to unlock apps and your Mac

### Color Theme

- iTerm 2
    - [Dark theme for iTerm and 233+ apps - Dracula](https://draculatheme.com/iterm)
- vim
    - [Dark theme for Vim and 233+ apps - Dracula](https://draculatheme.com/vim)
- Visual Studio Code
    - [Dark theme for Visual Studio Code and 233+ apps - Dracula](https://draculatheme.com/visual-studio-code)
- Slack
    - [Dark theme for Slack and 233+ apps - Dracula](https://draculatheme.com/slack)
- Chrome
    - [Dark theme for Chrome and 233+ apps - Dracula](https://draculatheme.com/chrome)
- Alfred
    - [Dark theme for Alfred and 233+ apps - Dracula](https://draculatheme.com/alfred)
- JetBrains IDE
    - [Dark theme for JetBrains and 233+ apps - Dracula](https://draculatheme.com/jetbrains)
