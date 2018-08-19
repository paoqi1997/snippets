--[[
    Version: 5.3.4
    Theme: Lua之错误处理
--]]

local function add(a, b)
    assert(type(a) == 'number', 'a is not a number!')
    assert(type(b) == 'number', 'b is not a number!')
    return a + b
end

-- 10
print(add(4, 6))

local function isnumber(param)
    if (type(param) ~= 'number') then
        error('param is not a number!', 2)
    end
    return true
end

-- true
print(isnumber(2))

local function divide(a, b)
    if (b == 0) then
        error('b can not be zero!', 2)
    end
    return a / b
end

-- false   b can not be zero!
print(pcall(divide, 2, 0))

local function handler()
    print(debug.traceback())
end

-- false   nil
print(xpcall(divide, handler, 2, 0))
