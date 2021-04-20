package main

import (
    "database/sql"
    "fmt"

    _ "github.com/go-sql-driver/mysql"
)

func main() {
    db, err := sql.Open("mysql", "root:123456@/mydb")
    if err != nil {
        fmt.Println(err)
    }
    defer db.Close()

    err = db.Ping()
    if err != nil {
        fmt.Println(err)
    }
}
