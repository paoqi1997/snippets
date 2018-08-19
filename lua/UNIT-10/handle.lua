--[[
    Version: 5.3.4
    Theme: Lua之文件I/O
--]]

-- implicit file handle
file = io.open('TonyHorse.txt', 'r')

io.input(file)

print(io.read())

io.close(file)

file = io.open('TonyHorse.txt', 'a')

io.output(file)

io.write('\n' .. 'NM$L! I am your brother!' .. '\n')

io.close(file)

-- explicit file handle
file = io.open('Van.txt', 'r')

print(file:read())

file:close()

file = io.open('Van.txt', 'a')

file:write('\n' .. 'Do you like what you see?' .. '\n')

file:close()

-- 逐行读取文件
for line in io.lines('Numbers.txt') do
    print(line)
end

-- 获取文件当前位置并读取一行
file = io.open('Numbers.txt', 'r')

file:seek('set')

print(file:read('*l'))

file:close()
