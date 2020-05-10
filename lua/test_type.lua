-- Lua之基本类型

-- 剩下一种基本类型 userdata 并未列出

val = nil
print(type(val)) -- nil

val = true
print(type(val)) -- boolean

val = 1024
print(type(val)) -- number

val = 'Hello World!'
print(type(val)) -- string

val = function(x, y)
    if (x > y) then
        return x
    else
        return y
    end
end
print(type(val)) -- function

val = coroutine.create(val)
print(type(val)) -- thread

val = {}
print(type(val)) -- table
