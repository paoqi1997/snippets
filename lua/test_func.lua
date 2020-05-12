-- Lua之函数

function min(x, y)
    if x < y then
        return x
    else
        return y
    end
end

print(min(1, 2))

-- 类型为函数的变量
max = function(x, y)
    if x > y then
        return x
    else
        return y
    end
end

-- 将函数变量作为函数参数
function myfunc(func, x, y)
    return func(x, y)
end

print(myfunc(max, 1, 2))

-- 返回多个值
function sumList(list)
    local len = #list
    local sum = 0
    for _, v in ipairs(list) do
        sum = sum + v
    end
    return len, sum
end

print(sumList({1, 3, 5, 7, 9}))

-- 传递可变参数
function sumArgs(...)
    local sum = 0
    for _, v in ipairs{...} do
        sum = sum + v
    end
    return sum
end

print(sumArgs(1, 3, 5, 7, 9))

-- 保存可变参数到变量中
function average(...)
    local sum = 0
    local args = {...}
    for _, v in ipairs(args) do
        sum = sum + v
    end
    -- or return sum / #args
    return sum / select('#', ...)
end

print(average(1, 3, 5, 7, 9))

-- 固定参数及可变参数
function log(sLevel, ...)
    for i, v in ipairs{...} do
        -- select(i, ...): 可变参数列表中的参数
        print(string.format('[%s] %s', sLevel, select(i, ...)))
    end
end

log('INFO', 'Hello World!')

-- 闭包
function Iter(list)
    local i = 0
    local func = function()
        i = i + 1
        return list[i]
    end
    return func
end

iter = Iter({1, 3, 5, 7, 9})

s = ''
while true do
    local ele = iter()
    if ele == nil then
        break
    else
        s = s .. ele .. ' '
    end
end
print(s)
