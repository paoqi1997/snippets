local queueKey = KEYS[1]
local lenLimit = ARGV[1]
local data = ARGV[2]

local ret = 0

-- https://redis.io/commands/lpush/
local len = redis.call('LPUSH', queueKey, data)
if len > tonumber(lenLimit) then
    redis.call('LTRIM', queueKey, 0, lenLimit - 1)
    ret = 1
end

len = redis.call('LLEN', queueKey)

return { ret, len }
