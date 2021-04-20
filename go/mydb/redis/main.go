package main

import (
    "context"
    "fmt"

    "github.com/go-redis/redis/v8"
)

func main() {
    ctx := context.Background()

    rdb := redis.NewClient(&redis.Options{
        Addr: "localhost:6379",
        Password: "",
        DB: 0,
    })

    err := rdb.Set(ctx, "name", "paoqi", 0).Err()
    if err != nil {
        fmt.Println(err)
    }

    val, err := rdb.Get(ctx, "name").Result()
    if err != nil {
        fmt.Println(err)
    }

    fmt.Printf("name: %s\n", val)
}
