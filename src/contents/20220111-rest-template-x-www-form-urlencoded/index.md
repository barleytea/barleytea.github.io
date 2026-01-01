---
title: "Spring Boot の RestTemplate で application/x-www-form-urlencoded な request を送信する"
created: "2022-01-11"
path: "/rest-template-x-www-form-urlencoded"
eyecatcher: "./eyecatcher.png"
tags: ["Java", "Spring"]
category: "Tech"
---

## TL; DR

request として渡す Object に`MultiValueMap`を使用すること。

`application/json`の場合とは異なり、任意の Object を使うことはできない。

```java
// MultiValueMap に key, value を詰めて…
MultiValueMap<String, String> request = new LinkedMultiValueMap<>();
request.add("key1", value1);
request.add("key2", value2);
// request として渡す
restTemplate.postForObject(url, request, String.class);
```


## 背景 | 何に困っていたか

RestTemplate に渡す request を作るとき、だいたい以下のような感じの POJO を放り込んでやればよしなにやってくれるイメージだった。

```java
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SampleRequest {

    @JsonProperty("hoge")
    private String hoge;

    @JsonProperty("fuga")
    private String fuga;
}
```

しかし、以下の実装では request が通らなかった。

```java
// POST request を送る
public String post(String uri) {
		SampleRequest request = new SampleRequest();
		request.setHoge("hoge");
		request.setFuga("fuga");
		// ↓ ダメ
		return restTemplate().postForObject(url, request, String.class);
}

// Content-Type に **application/x-www-form-urlencoded** を指定して RestTemplate を組み立てる
private RestTemplate restTemplate() {
    return this.restTemplateBuilder
        .additionalInterceptors((request, body, execution) -> {
            HttpHeaders headers = request.getHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
            return execution.execute(request, body);
        })
        .setConnectTimeout(Duration.ofMillis(5000))
        .setReadTimeout(Duration.ofMillis(5000))
        .build();
}
```

………🤔

## 詳細 | 何が起こっていたか

1. RestTemplate は、response の Content-Type に応じて適切な`HttpMessageConverter`の実装を選択し、使用する
    * `HttpMessageConverter`とは何ぞや？
        
        > Strategy interface for converting from and to HTTP requests and responses.
        > 
        
        [HttpMessageConverter (Spring Framework 5.3.14 API)](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/converter/HttpMessageConverter.html)
        
2. Content-Type が`application/x-www-form-urlencoded`の場合は、`FormHttpMessageConverter`を使用する
    
    [spring-framework/HttpMessageConverterExtractor.java at main · spring-projects/spring-framework](https://github.com/spring-projects/spring-framework/blob/main/spring-web/src/main/java/org/springframework/web/client/HttpMessageConverterExtractor.java)
    
3. `FormHttpMessageConverter`は以下のように振る舞う
    
    > Implementation of [HttpMessageConverter](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/converter/HttpMessageConverter.html) to read and write 'normal’ HTML forms and also to write (but not read) multipart data (e.g. file uploads).
    > In other words, this converter can read and write the `"application/x-www-form-urlencoded"` media type as [MultiValueMap<String, String>](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/util/MultiValueMap.html), and it can also write (but not read) the `"multipart/form-data"` and `"multipart/mixed"` media types as [MultiValueMap<String, Object>](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/util/MultiValueMap.html).

    
    [FormHttpMessageConverter (Spring Framework 5.3.14 API)](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/converter/FormHttpMessageConverter.html)
    
    [spring-framework/FormHttpMessageConverter.java at main · spring-projects/spring-framework](https://github.com/spring-projects/spring-framework/blob/main/spring-web/src/main/java/org/springframework/http/converter/FormHttpMessageConverter.java)
    
4. したがって、いくら任意の POJO を request に渡してもダメ。 `MultiValueMap`を使用すること

    ```java
    // MultiValueMap に key, value を詰めて…
    MultiValueMap<String, String> request = new LinkedMultiValueMap<>();
    request.add("key1", value1);
    request.add("key2", value2);
    // request として渡す
    restTemplate.postForObject(url, request, String.class);
    ```