/**
 * Go之指针及结构体
 */

package main

import "fmt"

type person struct {
    sex string
    age int
}

var (
    p1 = person{"female", 18} // {female 18}
    p2 = person{sex: "male"}  // {male 0}
    p3 = person{}             // { 0}
)

func main() {
    var n int = 2048
    p := &n
    fmt.Println(*p, n) // 2048 2048

    *p = 1024
    fmt.Println(*p, n) // 1024 1024

    paoqi := person{"male", 16}
    q := &paoqi
    q.sex = "female"
    fmt.Println(*q)    // {female 16}
    fmt.Println(paoqi) // {female 16}

    fmt.Println(p1, p2, p3)
}
