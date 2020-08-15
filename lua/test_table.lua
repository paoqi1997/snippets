-- Lua之iterator及table

function factorial(maxn, n)
    if n < maxn then
        n = n + 1
        local num = 1
        for i = 2, n do
            num = num * i
        end
        return n, num
    end
end

for i, v in factorial, 5, 0 do
    print(i, v)
end

map = {}
map[0] = 1024; map['lua'] = 5.2

for k, v in pairs(map) do
    sType = type(k)
    if sType == 'number' then
        print(string.format('map[%d]: %d', k, v))
    elseif sType == 'string' then
        print(string.format('map[\'%s\']: %.1f', k, v))
    end
end

map2 = map
map2[0] = 2048; map2['lua'] = 5.3

for k, v in pairs(map) do
    sType = type(k)
    if sType == 'number' then
        print(string.format('map[%d]: %d', k, v))
    elseif sType == 'string' then
        print(string.format('map[\'%s\']: %.1f', k, v))
    end
end

libs = {'libevent', 'muduo', 'pqnet', 'handy'}

print(table.concat(libs, '|', 2, 3))

-- 将libuv插入到索引为2的位置
table.insert(libs, 2, 'libuv')
s = ''
for _, v in pairs(libs) do
    s = s .. v .. ' '
end
print(s)

-- 将索引为2的元素从table中删除
table.remove(libs, 2)
s = ''
for _, v in pairs(libs) do
    s = s .. v .. ' '
end
print(s)

table.sort(libs,
    function(x, y)
        return string.len(x) < string.len(y)
    end
)
s = ''
for _, v in pairs(libs) do
    s = s .. v .. ' '
end
print(s)

-- 遍历时遇到nil，ipairs会终止遍历，pairs会跳过nil继续遍历
engines = {
    'unity', nil, 'unreal'
}

s1, s2 = '', ''
for _, v in ipairs(engines) do
    s1 = s1 .. v .. ' '
end
print(s1)
for _, v in pairs(engines) do
    s2 = s2 .. v .. ' '
end
print(s2)

--[[
ipairs不会输出键值对，但pairs会
pairs输出键值对的时候，键值对的顺序不是固定的
这是因为table在存储键值对的时候，是按键的哈希值存储的
]]
list = {
    'Hello', x = 1, y = 2, z = 3, 11, game = 'rogue', 'World', 10
}

for k, v in ipairs(list) do
    print('[ipairs] key: ' .. k .. ', value: ' .. v)
end
for k, v in pairs(list) do
    print('[pairs] key: ' .. k .. ', value: ' .. v)
end
