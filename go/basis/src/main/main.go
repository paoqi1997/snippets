package main

func main() {
    TEST_UNIT("Platform", TEST_Platform)
    TEST_UNIT("Random", TEST_Random)
    TEST_UNIT("slice", TEST_slice)
    TEST_UNIT("map", TEST_map)
    TEST_UNIT("struct_Engine", TEST_struct_Engine)
    defer TEST_UNIT("Timer", TEST_Timer)
}
