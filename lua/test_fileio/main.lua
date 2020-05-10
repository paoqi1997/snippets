-- Lua之文件I/O

-- implicit file handle
f = io.open('data.txt', 'r')
io.input(f)
print(io.read())
io.close(f)

f = io.open('data.txt', 'a')
io.output(f)
io.write('What do you mean?\n')
io.close(f)

-- explicit file handle
f = io.open('data.txt', 'r')
print(f:read())
f:close()

s = 'Nice to meet you.\n'
len = #s

f = io.open('data.txt', 'a')
f:write(s)
f:close()

-- 逐行打印文件
for line in io.lines('data.txt') do
    print(line)
end

f = io.open('data.txt', 'r')
f:seek('end')
f:seek('cur', -(len + 1))
-- 读取当前行
print(f:read('ll'))
f:close()
