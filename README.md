# barlog.tech

[個人ブログ](https://barlog.tech)

## 技術スタック

* [Gatsby](https://www.gatsbyjs.com/)
* [Tailwind CSS](https://tailwindcss.com/)

## 前提条件

* Node.js 20.x
* yarn

## 開発環境起動

```sh
yarn install
yarn run develop # run on :8000
```

## Storybook

```sh
yarn run storybook # run on :6006
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
