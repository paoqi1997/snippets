--[[
    Version: 5.3.4
    Theme: Lua之变量
--]]

x1 = 1
local y1 = 2

print(x1, y1)       -- 1 2

do
    local x1 = 3
    y1 = 4
    print(x1, y1)   -- 3 4
end

print(x1, y1, '\n') -- 1 4

x2 = 5
local y2 = 6

print(x2, y2)       -- 5 6

do
    x2 = 7
    local y2 = 8
    print(x2, y2)   -- 7 8
end

print(x2, y2, '\n') -- 7 6

function func()
    x3 = 0
    local y3 = 9
    print(x3, y3)   -- 0 9
end

func()
print(x3, y3, '\n') -- 0 nil

x4, y4 = 233, 666

print(x4, y4)       -- 233 666

x4, y4 = y4, x4     -- swap

print(x4, y4)       -- 666 233
