---
title: "Java8 で Exponential Backoff な retry を実装してみる"
created: "2022-01-11"
path: "/java8-exponential-backoff-retry"
eyecatcher: "./eyecatcher.png"
tags: ["Java"]
---

```toc
```

## TL; DR

とりあえず成果物

```java:title=RetryCommand.java
package tech.barlog.examples

import java.util.concurrent.TimeUnit;
import java.util.function.Supplier;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.client.RestClientResponseException;

@Slf4j
@RequiredArgsConstructor
public class RetryCommand<T> {

    private final int maxRetries;

    @Getter private int retryCount = 0;

    /**
     * 関数を受け取って実行し、例外が発生したら最大 {@code maxRetries} 回リトライ処理を行う
     * @param function 実行する関数
     * @return 渡された関数の戻り値
     */
    public T run(Supplier<T> function) {
        try {
            return function.get();
        } catch(Exception e) {
            return this.retry(function);
        }
    }

    private T retry(Supplier<T> function) {
        for (retryCount = 1; retryCount <= maxRetries; retryCount++) {
            try {
                return function.get();
            } catch (Exception e) {
                long timeSleep = (long) Math.pow(2, retryCount);
                try {
                    TimeUnit.SECONDS.sleep(timeSleep);
                } catch (InterruptedException ex) {
                    throw new RuntimeException(ex);
                }
                log.warn(String.format("Retried %d times, error : %s", retryCount, e));
            }
        }

        // すべてのリトライに失敗したとき、実行時例外を送出する
        throw new RuntimeException(String.format("All attempts failed. %d times.", maxRetries));
    }
}
```

```java:title=RetryCommandTest.java
package tech.barlog.examples;

import org.junit.Assert;
import org.junit.Test;

import static org.hamcrest.CoreMatchers.is;

public class RetryCommandTest {

    private static final int MAX_RETRY_COUNT = 3;
    private static final String RESULT_SUCCESS = "success";

    @Test
    public void testRunWithoutRetry() {
        final String result = new RetryCommand<String>(MAX_RETRY_COUNT).run(() -> RESULT_SUCCESS);
        Assert.assertThat(result, is(RESULT_SUCCESS));
    }

    @Test
    public void testRunWithRetryOnce() {
        final RetryCommand<String> retryCommand = new RetryCommand<>(MAX_RETRY_COUNT);
        final String result = retryCommand.run(() -> {
            if (retryCommand.getRetryCount() < 1) {
                throw new RuntimeException(String.format("First run "
                    + "should fail for this case. retryCount: %d", retryCommand.getRetryCount()));
            } else {
                return RESULT_SUCCESS;
            }
        });
        Assert.assertThat(result, is(RESULT_SUCCESS));
        Assert.assertThat(retryCommand.getRetryCount(), is(1));
    }

    @Test
    public void testRunWithRetryTwice() {
        final RetryCommand<String> retryCommand = new RetryCommand<>(MAX_RETRY_COUNT);
        final String result = retryCommand.run(() -> {
            if (retryCommand.getRetryCount() < 2) {
                throw new RuntimeException(String.format("First retry attempt "
                    + "should fail for this case. retryCount: %d", retryCommand.getRetryCount()));
            } else {
                return RESULT_SUCCESS;
            }
        });
        Assert.assertThat(result, is(RESULT_SUCCESS));
        Assert.assertThat(retryCommand.getRetryCount(), is(2));
    }

    @Test
    public void testRunWithRetryThreeTimes() {
        final RetryCommand<String> retryCommand = new RetryCommand<>(MAX_RETRY_COUNT);
        final String result = retryCommand.run(() -> {
            if (retryCommand.getRetryCount() < 3) {
                throw new RuntimeException(String.format("First and second retry attempts "
                    + "should fail for this case. retryCount: %d", retryCommand.getRetryCount()));
            } else {
                return RESULT_SUCCESS;
            }
        });
        Assert.assertThat(result, is(RESULT_SUCCESS));
        Assert.assertThat(retryCommand.getRetryCount(), is(3));
    }

    @Test(expected = RuntimeException.class)
    public void testRunWithAllRetryFailed() {
        final RetryCommand<String> retryCommand = new RetryCommand<>(MAX_RETRY_COUNT);
        retryCommand.run(() -> {
            throw new RuntimeException(String.format("All retry attempts "
                + "should fail for this case. retryCount: %d", retryCommand.getRetryCount()));
        });
    }
}
```