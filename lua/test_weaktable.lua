-- Lua之弱表

strongtable = {}

strongtable[1] = function()
    print("I'm the first element.")
end
strongtable[2] = function()
    print("I'm the second element.")
end
strongtable[3] = {1, 2, 3}

print(#strongtable) -- 3
collectgarbage()
print(#strongtable) -- 3

-- weak表中的引用是弱引用，弱引用不会引起对象的引用计数的变化
-- 换言之，如果一个对象只有弱引用指向它，那么gc会自动回收该对象的内存

-- __mode可以取以下三个值：k/v/kv
-- k表示table.key是weak的
-- v表示table.value是weak的
-- kv表示只要key和value中的一个被gc，这个kv就从表中被移除了
weaktable = setmetatable({}, { __mode = 'v' })

weaktable[1] = function()
    print("I'm the first element.")
end
weaktable[2] = function()
    print("I'm the second element.")
end
weaktable[3] = {1, 2, 3}

print(#weaktable) -- 3

ele = weaktable[1]
collectgarbage()
print(#weaktable) -- 1

ele = nil
collectgarbage()
print(#weaktable) -- 0

wt = setmetatable({}, { __mode = 'k' })

key = {}
wt[key] = 1
key = {}
wt[key] = 2

for k, v in pairs(wt) do
    print('wt: ' .. v) -- 1 2
end

collectgarbage()

for k, v in pairs(wt) do
    print('wt: ' .. v) -- 2
end

local tbl_rgb = setmetatable({}, { __mode = 'v' })

function createRGB(red, green, blue)
    local k_rgb = red .. '-' .. green .. '-' .. blue
    if tbl_rgb[k_rgb] then
        return tbl_rgb[k_rgb]
    else
        local rgb = { r = red, g = green, b = blue }
        tbl_rgb[k_rgb] = rgb
        return rgb
    end
end

function printRGB(rgb)
    print('(' .. rgb.r .. ', ' .. rgb.g .. ', ' .. rgb.b .. ')')
end

printRGB(createRGB(0, 0, 0))
printRGB(createRGB(255, 255, 255))
