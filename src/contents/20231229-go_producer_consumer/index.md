---
title: "Go 並行処理超入門"
created: "2023-12-29"
path: "/go_producer_consumer"
eyecatcher: "../../images/barleytea.png"
tags: ["Go", "並行処理"]
---

```toc
```

Go で並行処理のサンプル実装を作ったのでメモ
ソースコード全体は[ここ](https://github.com/barleytea/go_sandbox/blob/main/producer_consumer/main.go)

## goroutine

### 定義

Go で並行処理を行うには `goroutine` という機能が必要になる。
[言語仕様書](https://go.dev/ref/spec#Go_statements) では goroutine は下記のように定義されている。

> A "go" statement starts the execution of a function call as an independent concurrent thread of control, or goroutine, within the same address space.

> The expression must be a function or method call; it cannot be parenthesized. Calls of built-in functions are restricted as for expression statements.
> The function value and parameters are evaluated as usual in the calling goroutine, but unlike with a regular call, program execution does not wait for the invoked function to complete. Instead, the function begins executing independently in a new goroutine. When the function terminates, its goroutine also terminates. If the function has any return values, they are discarded when the function completes.

翻訳すると、
```
go ステートメントは、同じアドレス空間内で、独立した並行スレッド（goroutine）として関数を実行する。

関数の値とパラメータは呼び出し元の goroutine で通常通り評価される。通常の呼び出しとは異なり、プログラムの実行は呼び出された関数の完了を待たず、関数は新しい  goroutine で独立して実行される。関数が終了すると、その  goroutine も終了する。関数に戻り値がある場合、それらは関数が終了した時点で破棄される。
```

つまり goroutine は、通常の方法で実行される処理に対して並行に実行される関数のことだと理解すれば良さそうだ。


```go
// goroutine を使わないバージョン
package main

import "fmt"

func produce(num int) {
	for i := 1; i <= num; i++ {
		fmt.Printf("procuded %d\n", i)
	}
}

func main() {
	produce(10)
}
```

上記のコードは goroutine を使っておらず、当然下記のような出力となる。

```
procuded 1
procuded 2
procuded 3
procuded 4
procuded 5
procuded 6
procuded 7
procuded 8
procuded 9
procuded 10
```

ここで、`produce` を goroutine 化してみる。

```go
package main

import "fmt"

func produce(num int) {
	for i := 1; i <= num; i++ {
		fmt.Printf("procuded %d\n", i)
	}
}

func main() {
	go produce(10) // goroutine 化
}
```

しかし、これは実行しても何も出力されない。
理由は、`go produce(10)` の実行が完了する前に `main` 処理が終了してしまったためである。

これを防ぐためには `go say("hello")` の終了を待ち合わせる（同期を取る）必要がある。
待ち合わせを実現する方法として、`channel` を利用するパターンと、`sync.WaitGroup` を利用するパターンが考えられる。

## 同期（待ち合わせ）

### channel

`channel` とは、[言語仕様](https://go.dev/ref/spec#Channel_types) によれば、

> A channel provides a mechanism for concurrently executing functions to communicate by sending and receiving values of a specified element type.

とあり、並行に実行される処理の間で値を受け渡しするための仕組みである。

ここで、

> The capacity, in number of elements, sets the size of the buffer in the channel. If the capacity is zero or absent, the channel is unbuffered and communication succeeds only when both a sender and receiver are ready. Otherwise, the channel is buffered and communication succeeds without blocking if the buffer is not full (sends) or not empty (receives). 

とあるように、バッファなしの `channel` は送信操作と受信操作がペアで発生する必要があるため、この性質を利用して同期（待ち合わせ）を実現することができる。

```go
package main

import "fmt"

func produce(num int, done chan<- bool) {
	for i := 1; i <= num; i++ {
		fmt.Printf("procuded %d\n", i)
	}
	// channel にデータを送信する
	done <- true
}

func main() {
	// unbuffered channel を定義
	done:= make(chan bool)
	go produce(10, done)
	// channel からデータを受信する
	<-done
}
```

```
procuded 1
procuded 2
procuded 3
procuded 4
procuded 5
procuded 6
procuded 7
procuded 8
procuded 9
procuded 10
```

`main` 関数の `<-done` は `done` チャネルから値を受信するまでメインスレッドをブロックするので、`produce` ですべての処理を終えてから `done` チャネルに値を送信することで同期を取ることができる。

### WaitGroup

WaitGroup を使って同期を取ることもできる。

[WaitGroup の言語仕様](https://pkg.go.dev/sync#WaitGroup) によると、

> A WaitGroup waits for a collection of goroutines to finish. The main goroutine calls Add to set the number of goroutines to wait for. Then each of the goroutines runs and calls Done when finished. At the same time, Wait can be used to block until all goroutines have finished.

> A WaitGroup must not be copied after first use.

> In the terminology of the Go memory model, a call to Done “synchronizes before” the return of any Wait call that it unblocks.

とある。

下記のような手順で使用すれば良さそうだ。
1. [Add](https://pkg.go.dev/sync#WaitGroup.Add) を呼び出すことで待ち合わせる goroutine の数を WaitGroup 内部のカウンタに設定し、
1. 各 goroutine の終了時に [Done](https://pkg.go.dev/sync#WaitGroup.Done) を呼び出すことでカウンタをデクリメントし、
1. [Wait](https://pkg.go.dev/sync#WaitGroup.Wait) でカウンタが0になるまで（待ち合わせたい goroutine が全て終了するまで）メイン処理をブロックする

```go
package main

import (
	"fmt"
	"sync"
)

func produce(num int, wg *sync.WaitGroup) {
	// 2. goroutine の終了時に Done を呼び出すことでカウンタをデクリメントする
	defer wg.Done()
	for i := 1; i <= num; i++ {
		fmt.Printf("procuded %d\n", i)
	}
}

func main() {
	var wg sync.WaitGroup
	// 1. Add を呼び出すことで待ち合わせる goroutine の数を WaitGroup 内部のカウンタに設定する
	wg.Add(1)
	go produce(10, &wg)
	// 3. Wait でカウンタが0になるまで（待ち合わせたい goroutine が全て終了するまで）メイン処理をブロックする
	wg.Wait()
}
```

```
procuded 1
procuded 2
procuded 3
procuded 4
procuded 5
procuded 6
procuded 7
procuded 8
procuded 9
procuded 10
```

ここで注意すべきことは、`go produce("10", &wg)` のように `WaitGroup` の参照を渡す必要があるということだ。
というのも [WaitGroup の言語仕様](https://pkg.go.dev/sync#WaitGroup) に、

> A WaitGroup must not be copied after first use.

とあるように、`WaitGroup` を複製するのはご法度だからである。

ところで、`WaitGroup` は `Add` を持つことから推察されるように、複数の goroutine の同期を取る際にその威力を発揮する。

```go
package main

import (
	"fmt"
	"sync"
)

func produce(num int, done chan bool) {
	var pg sync.WaitGroup
	for i := 1; i <= num; i++ {
		i := i
		pg.Add(1)
		go func() { // 新たに goroutine 化
			defer pg.Done()
			fmt.Printf("procuded %d\n", i)
		}()
	}
	pg.Wait()
	done <- true
}

func main() {
	done := make(chan bool)
	go produce(10, done)
	<-done
}
```

```
procuded 1
procuded 10
procuded 6
procuded 7
procuded 8
procuded 5
procuded 3
procuded 9
procuded 2
procuded 4
```

各数値ごとに print のための goroutine を立てるように変更した。
`produce` 関数内で生成される10個の goroutine の同期を `WaitGroup` を利用して取っている。
さらに、`produce` 関数自体も `go produce()` goroutine 化しているため、これが終了するまでメインスレッドをブロックするために `unbuffered channel` を使用している。

各数値の print が並行に行われるため、出力順がばらばらになっていることが分かる。

## Producer-Consumer Pattern

Producer-Consumer Pattern は並行処理をデータの生産者と消費者に分離することで、スループットの向上等を狙うデザインパターンである。

golang に限らず並行処理の文脈ではしばしば言及されるパターンだが、golang では `goroutine`, `WaitGroup`, `channel` を利用することで比較的容易に実装することができる。

```go
package main

import (
	"fmt"
	"sync"
)

func main() {

	var wg sync.WaitGroup
	ch := make(chan int, 10)

	// 1 ~ 10 までの整数を channel に送信する
	go produce(10, ch)

	// 3 個の consumer スレッド で channel からデータを受信する
	for i := 0; i < 3; i++ {
		i := i
		wg.Add(1)
		go consume(i, ch, &wg)
	}

	wg.Wait()
}

func produce(num int, ch chan int) {
	var pg sync.WaitGroup
	defer close(ch)
	for i := 1; i <= num; i++ {
		i := i
		pg.Add(1)
		go func() {
			defer pg.Done()
			ch <- i
		}()
	}
	pg.Wait()
}

func consume(idx int, ch chan int, wg *sync.WaitGroup) {
	defer wg.Done()
	for i := range ch {
		fmt.Printf("#%d: consumed %d\n", idx, i)
	}
}
```

```
#2: consumed 2
#1: consumed 6
#1: consumed 8
#1: consumed 7
#1: consumed 4
#1: consumed 10
#1: consumed 3
#1: consumed 9
#2: consumed 1
#0: consumed 5
```

`produce` 内では10個の goroutine を生成し、その値を3つの `consume` で受け取って print している。

ちなみに `consume` で下記のように `range` を使っているのは、こうすることで `ch` が `close` されるまでループ処理を継続してくれるからだ。
```go
for i := range ch {
	fmt.Printf("#%d: consumed %d\n", idx, i)
}
```
  

そのため、`produce` 内では明示的に `ch` を `close` してやる必要がある。
```go
defer close(ch)
```



