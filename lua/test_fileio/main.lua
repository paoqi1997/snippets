-- Lua之文件I/O

s1 = 'Hello World!\n'
s2 = 'What do you mean?\n'
s3 = 'Nice to meet you.\n'
len = #s3

-- implicit file handle
f = io.open('data.txt', 'r')
io.input(f)
print(io.read())
io.close(f)

f = io.open('data.txt', 'w')
io.output(f)
io.write(s1, s2, s3)
io.close(f)

-- explicit file handle
f = io.open('data.txt', 'r')
print(f:read())
f:close()

f = io.open('data.txt', 'w')
f:write(s1, s2, s3)
f:close()

-- 逐行打印文件
lineno = 1
for line in io.lines('data.txt') do
    print(string.format('line %d: %s', lineno, line))
    lineno = lineno + 1
end

f = io.open('data.txt', 'r')
f:seek('end')
f:seek('cur', -(len + 1))
-- 读取当前行
print(f:read('ll'))
f:close()
