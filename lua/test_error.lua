-- Lua之错误处理

local function add(x, y)
    assert(type(x) == 'number', 'x is not a number!')
    assert(type(y) == 'number', 'y is not a number!')
    return x + y
end

print(add(1, 2))

local function isNumber(param)
    if type(param) ~= 'number' then
        error('param is not a number!')
    else
        return true
    end
end

-- false   param is not a number!
print(pcall(isNumber, ''))

local function divide(x, y)
    if y == 0 then
        error('y can not be zero!')
    else
        return x / y
    end
end

local function printInfo()
    print(debug.traceback())
end

-- false   y can not be zero!
print(pcall(divide, 2, 0))
-- stack traceback:
--         ...
-- false   nil
print(xpcall(divide, printInfo, 2, 0))
