# barlog.tech

[個人ブログ](https://barlog.tech)

## 技術スタック

* [Gatsby](https://www.gatsbyjs.com/)
* [Tailwind CSS](https://tailwindcss.com/)

## 開発環境セットアップ

```
$ yarn install
$ yarn run develop
```

## 記事執筆

1. postgen.sh を実行してマークダウンファイルの雛形を作成する

    ```sh
    $ bash ./postgen.sh
    ```
2. textlint

    ```sh
    $ yarn run lint
    # or
    $ yarn run lintfix
    ```
