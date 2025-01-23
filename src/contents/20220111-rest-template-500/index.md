---
title: "Spring Boot の RestTemplate で 500 系エラーが発生した場合でも reponse header / body の中身を取得する"
created: "2022-01-11"
path: "/rest-template-500"
eyecatcher: "./eyecatcher.png"
tags: ["Java", "Spring"]
category: "Tech"
---

## 目次

```toc
```

## 困ったこと

RestTemplate で http request を送って 500 系のエラーが帰ってきた場合、`RestClientException`が送出され、戻り値としては http response が取得できない。

## 解決方法

`RestClientException`のサブクラスである`RestClientResponseException`を catch すること。

```java
} catch(RestClientResponseException e) {
    e.getRawStatusCode();
    e.getResponseHeaders();
    e.getResponseBodyAsString();
}
```

## なぜ？

> Common base class for exceptions that contain actual HTTP response data.

とのことなので。  

FYI: https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/client/RestClientResponseException.html