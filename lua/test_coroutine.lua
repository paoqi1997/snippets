-- Lua之协程

co = coroutine.create(
    function(s)
        print('Msg: ' .. s)
    end
)

print(coroutine.status(co))
coroutine.resume(co, 'Hello World!')
print(coroutine.status(co))

cofunc = coroutine.wrap(
    function(s)
        print('Msg: ' .. s)
    end
)

cofunc('Hi!')

co = coroutine.create(
    function(s1)
        print('Co-body: ' .. s1) -- Co-body: s1
        local s3 = coroutine.yield('s2')
        print('Co-body: ' .. s3) -- Co-body: s3
        local s5 = coroutine.yield('s4')
        print('Co-body: ' .. s5) -- Co-body: s5
    end
)

print(coroutine.resume(co, 's1')) -- true    s2
print(coroutine.resume(co, 's3')) -- true    s4
print(coroutine.resume(co, 's5')) -- true

client = coroutine.create(
    function(iNum)
        local iSendNum = iNum
        while iSendNum < 5 do
            print('[client] C2S: ' .. iSendNum)
            _, iRecvNum = coroutine.resume(server, iSendNum)
            print('[client] S2C: ' .. iRecvNum)
            iSendNum = iRecvNum
        end
    end
)

server = coroutine.create(
    function(iNum)
        local iRecvNum = iNum
        while iRecvNum < 5 do
            print('[server] C2S: ' .. iRecvNum)
            iSendNum = iRecvNum + 1
            print('[server] S2C: ' .. iSendNum)
            iRecvNum = coroutine.yield(iSendNum)
        end
    end
)

coroutine.resume(client, 1)
