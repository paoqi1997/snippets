-- Lua之运算符、字符串及数组

-- 主要内容还是字符串
-- 不过运算符方面的内容也用到了 string.format 接口

-- Relational Operators: ==, ~=, <, <=, >, >=
-- Logical Operators: and, or, not

x, y = 2, 4

print(string.format('x + y = %d', x + y))
print(string.format('x - y = %d', x - y))
print(string.format('x * y = %d', x * y))
print(string.format('x / y = %f', x / y))
print(string.format('x %% y = %f', x % y))
print(string.format('x ^ y = %d', x ^ y))

print(string.byte('A'), string.char(65))
print(string.byte('a'), string.char(97))

name = 'Lua'

s = ''
s = s .. string.lower(name) .. ' '   -- lua
s = s .. string.upper(name) .. ' '   -- LUA
s = s .. string.len(name) .. ' '     -- 3
s = s .. string.reverse(name) .. ' ' -- auL
print(s)

words = 'bear dear hear year'

-- Lua的下标索引从1开始
-- string.find: 从起始位置1开始查找第一个子串，并返回其起止下标
-- 如果子串是dear，那么其起止下标分别对应d和r的下标
print(string.find(words, 'dear', 1))

-- 将ear替换为ao，共进行3次
print(string.gsub(words, 'ear', 'ao', 3))

print(string.rep(name, 2))      -- LuaLua
print(string.sub(words, 6, 9))  -- dear

print(string.format('%e', 255)) -- 2.550000e+002
print(string.format('%E', 255)) -- 2.550000E+002
print(string.format('%x', 255)) -- ff
print(string.format('%X', 255)) -- FF

print(string.match('I have eaten 2 apples.', '%d+ %a+'))

colors = 'read|green|blue'

s = ''
for color in string.gmatch(colors, '%a+') do
    s = s .. color .. ' '
end
print(s)

m = {}

k = 3
for i = 1, k do
    m[i] = {}
    for j = 1, k do
        m[i][j] = (i - 1) * k + j
    end
end

s = ''
for i = 1, k do
    for j = 1, k do
        s = s .. m[i][j] .. ' '
    end
end
print(s)
