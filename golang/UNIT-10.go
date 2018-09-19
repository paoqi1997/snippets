/**
 * Go之方法
 */

package main

import "fmt"

type player struct {
    id, charge int
}

func (p player) getid() int {
    return p.id
}

func getcharge(p player) int {
    return p.charge
}

type num_type int

func (self num_type) fibonacci() int {
    f1, f2, f3 := 1, 1, 2
    if self == 1 {
        return f1
    } else if self == 2 {
        return f2
    } else {
        for i := 3; i <= int(self); i++ {
            f3 = f1 + f2; f1 = f2; f2 = f3
        }
        return f3
    }
}

type role struct {
    level int
    profession string
}

func (r role) getlevel() int {
    return r.level
}

func (r *role) setlevel(l int) {
    r.level = l
}

func getprofession(r role) string {
    return r.profession
}

func setprofession(r *role, pro string) {
    r.profession = pro
}

func main() {
    kuikui := player{1, 100}
    fmt.Printf("Id: %d, Level: %d\n", kuikui.getid(), getcharge(kuikui))

    var val num_type = 8
    fmt.Println(val.fibonacci())      // 21

    yoghurt := role{1, "maid"}
    fmt.Println(yoghurt.getlevel())   // 1

    yoghurt.setlevel(10)
    fmt.Println(yoghurt.getlevel())   // 10

    juice := role{1, "nurse"}
    fmt.Println(getprofession(juice)) // nurse

    setprofession(&juice, "teacher")
    fmt.Println(getprofession(juice)) // teacher
}
