--[[
    Version: 5.3.4
    Theme: Lua之协程
--]]

co = coroutine.create
(
    function(str) print('Message: ' .. str) end
)

print(type(co))             -- thread
print(coroutine.status(co)) -- suspended

coroutine.resume(co, 'p')   -- Message: p
print(coroutine.status(co)) -- dead

cofunc = coroutine.wrap
(
    function(str) print('Message: ' .. str) end
)

print(type(cofunc)) -- function
cofunc('q')         -- Message: q

co2 = coroutine.create
(
    function(tmp0)
        print('Co-body: ' .. tmp0) -- Co-body: t1
        local tmp1 = coroutine.yield('t2')
        print('Co-body: ' .. tmp1) -- Co-body: t3
        local tmp2 = coroutine.yield('t4')
        print('Co-body: ' .. tmp2) -- Co-body: t5
    end
)

print(coroutine.resume(co2, 't1')) -- true    t2
print(coroutine.status(co2))       -- suspended

print(coroutine.resume(co2, 't3')) -- true    t4
print(coroutine.status(co2))       -- suspended

print(coroutine.resume(co2, 't5')) -- true
print(coroutine.status(co2))       -- dead

print(coroutine.resume(co2, 'ti')) -- false   cannot resume dead coroutine
print(coroutine.status(co2))       -- dead

client = coroutine.create
(
    function(init)
        local send = init
        while send < 10 do
            print('Sent by client: ' .. send)
            stat, recv = coroutine.resume(server, send)
            print('Received by client: ' .. recv)
            send = recv
        end
    end
)

-- Sent by client: 1
-- Received by server: 1
-- Sent by server: 2
-- Received by client: 2
-- ......
-- Sent by client: 9
-- Received by server: 9
-- Sent by server: 10
-- Received by client: 10

server = coroutine.create
(
    function(init)
        local recv = init
        while recv < 10 do
            print('Received by server: ' .. recv)
            send = recv + 1
            print('Sent by server: ' .. send)
            recv = coroutine.yield(send)
        end
    end
)

coroutine.resume(client, 1)
