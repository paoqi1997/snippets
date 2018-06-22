--[[
    Version: 5.3.4
    Theme: Lua之基本类型
--]]

-- 剩下一种基本类型 userdata 并未给出

_nil = nil

print(type(_nil))       -- nil

_boolean = true

print(type(_boolean))   -- boolean

_number = 1024

print(type(_number))    -- number

_string = 'Hello World!'

print(type(_string))    -- string

function _function(name)
    return name .. ' ' .. 'loves me.'
end

print(type(_function))  -- function

_coroutine = coroutine.create(_function)

print(type(_coroutine)) -- thread

_table = {'Apache', 'IIS', 'Nginx'}

print(type(_table))     -- table
