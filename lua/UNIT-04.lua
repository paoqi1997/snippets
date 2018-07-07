--[[
    Version: 5.3.4
    Theme: Lua之函数
--]]

function min(n1, n2)
    if (n1 < n2) then
        return n1
    else
        return n2
    end
end

print(min(2, 4))

-- 类型为函数的变量
max = function(n1, n2)
    if (n1 > n2) then
        return n1
    else
        return n2
    end
end

function getresult(n1, n2, operator)
    print(operator(n1, n2))
end

-- 将函数变量作为函数参数
getresult(4, 6, max)

-- 返回多个值
function sum(list)
    local len = #list
    local cnt = 0
    for i, v in ipairs(list) do
        cnt = cnt + v
    end
    return len, cnt
end

print(sum({1, 3, 5, 7, 9}))

-- 传递可变参数
function add(...)
    local n = 0
    for i, v in ipairs{...} do
        n = n + v
    end
    return n
end

print(add(1, 2, 3, 4, 5, 6))

-- 保存可变参数到变量中
function average(...)
    local sum = 0
    local arg = {...}
    for i, v in ipairs(arg) do
        sum = sum + v
    end
    --[[
    return sum / #arg
    --]]
    return sum / select('#', ...)
end

print(average(1, 2, 3, 4, 5, 6))

-- 固定参数及可变参数
function conn(province, ...)
    for i, v in ipairs{...} do
        -- 可变参数列表中的参数
        print(province .. ' - ' .. select(i, ...))
    end
end

conn('Guangdong', 'Guangzhou', 'Shenzhen')

-- 闭包
function new_iter(list)
    local i = 0
    local function func()
        i = i + 1
        return list[i]
    end
    return func
end

iter = new_iter({1, 3, 5, 7, 9})

while true do
    local element = iter()
    if (element == nil) then
        break
    else
        print(element)
    end
end
