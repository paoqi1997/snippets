package util

import (
    "math/rand"
    "runtime"
    "time"
)

func Platform() (string, string) {
    return runtime.GOOS, runtime.GOARCH
}

func SetSeed() {
    rand.Seed(time.Now().UnixNano())
}

func Random(n int) (res int) {
    res = rand.Intn(n)
    return
}

func Sum() func(int) int {
    var sum int = 0
    return func(n int) int {
        sum += n
        return sum
    }
}

type Obj interface {
    GetName() string
    SetName(name string)
}

type Engine struct {
    Name string
}

func (e Engine) GetName() string {
    return e.Name
}

func (e *Engine) SetName(name string) {
    e.Name = name
}
