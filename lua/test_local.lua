-- Lua之local

a, b = 1, 2
print(a, b)

do
    local a = 3
    b = 4
end
print(a, b)

c, d = 5, 6
print(c, d)

function func()
    local c = 7
    d = 8
end
func()
print(c, d)

x, y = 1024, 2048
print(x, y)

x, y = y, x
print(x, y)
