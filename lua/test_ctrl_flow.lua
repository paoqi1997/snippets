-- Lua之控制流

i, s = 0, ''
while (i < 10) do
    s = s .. i .. ' '
    i = i + 1
end
print(s)

s = ''
for i = 1, 10, 3 do
    s = s .. i .. ' '
end
print(s)

pollers = {'iocp', 'select', 'poll', 'epoll'}
for i, v in ipairs(pollers) do
    print(string.format('pollers[%d]: %s', i, v))
end

i, s = 0, ''
repeat
    s = s .. i .. ' '
    i = i + 1
until (i >= 10)
print(s)

arch = 'amd64'
if (arch == 'amd64') then
    print('windows-x64')
elseif (arch == '386') then
    print('windows-x86')
else
    print('windows-arm')
end

-- 666
print(233 and 666)

-- pollers.linux == pollers['linux']
pollers = {
    linux = 'epoll'
}

poller = pollers.win32 or 'select'
-- select
print(poller)

-- true
print(not nil)
