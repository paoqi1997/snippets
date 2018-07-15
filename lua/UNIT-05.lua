--[[
    Version: 5.3.4
    Theme: Lua之运算符、字符串及数组
--]]

-- Relational Operators: ==, ~=, <, <=, >, >=

-- Logical Operators: and, or, not

x, y = 2, 4

print(x .. ' + ' .. y .. ' = ' .. x + y) -- 6
print(x .. ' - ' .. y .. ' = ' .. x - y) -- -2
print(x .. ' * ' .. y .. ' = ' .. x * y) -- 8
print(x .. ' / ' .. y .. ' = ' .. x / y) -- 0.5
print(x .. ' % ' .. y .. ' = ' .. x % y) -- 2
print(x .. ' ^ ' .. y .. ' = ' .. x ^ y) -- 16.0

print(string.byte('p')) -- 112
print(string.char(112)) -- p

lang = 'Lua'

print(string.lower(lang))   -- lua
print(string.upper(lang))   -- LUA

print(string.len(lang))     -- 3
print(string.reverse(lang)) -- auL

spelling = 'gao kao yao'

print(string.find(spelling, 'ao', 1))       -- 2 3
print(string.gsub(spelling, 'ao', 'ou', 2)) -- gou kou yao 2

print(string.rep(lang, 2))        -- LuaLua
print(string.sub(spelling, 5, 7)) -- kao

print(string.format('%e', 4396))  -- 4.396000e+003
print(string.format('%E', 4396))  -- 4.396000E+003

print(string.format('%x', 4396))  -- 112c
print(string.format('%X', 4396))  -- 112C

-- 2 apples
print(string.match('I have eaten 2 apples.', '%d+ %a+'))

-- red green blue
for color in string.gmatch('red green blue', '%a+') do print(color) end

matrix = {}

k = 3
for i = 1, k do
    matrix[i] = {}
    for j = 1, k do
        matrix[i][j] = (i - 1) * k + j
    end
end

for i = 1, k do
    for j = 1, k do
        print(string.format('matrix[%d][%d] = %d', i, j, matrix[i][j]))
    end
end
