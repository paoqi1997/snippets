-- Lua之元表

-- __index: table[key]
engine1 = setmetatable({
    name = 'Unity'
}, {
    __index = { version = '2020.1' }
})

engine2 = setmetatable({
    name = 'Unreal'
}, {
    __index = setmetatable({
        version = '4.25'
    }, {
        __index = { language = 'C++' }
    })
})

print(engine1.name, engine1.version)
print(engine2.name, engine2.version, engine2.language)

socket = setmetatable({
    ip_address = '127.0.0.1'
}, {
    __index = function(table, key)
        if key == 'port' then
            return 8080
        else
            return nil
        end
    end
})

print(socket.ip_address .. ':' .. socket.port)

bag = { bandage = 0 }

-- __newindex: table[key] = value
role = setmetatable({
    hp = 144, mp = 90
}, {
    __newindex = bag
})

print(string.format('bag[bandage]: %d', bag.bandage))
role.bandage = 1
print(string.format('bag[bandage]: %d', bag.bandage))

project = setmetatable({
    language = 'C++'
}, {
    __newindex = function(table, key, value)
        rawset(table, key, value .. '.cpp')
    end
})

project.file = 'main'
print(project.file)

-- __add: operation +
box = setmetatable({
    1, 3, 5, 7, 9
}, {
    __add = function(lhs, rhs)
        local len = 0
        if #lhs < #rhs then
            len = #lhs
        else
            len = #rhs
        end
        for i = 1, len do
            lhs[i] = lhs[i] + rhs[i]
        end
        return lhs
    end
})

box = box + {2, 4, 6, 8, 10}

s = ''
for _, v in pairs(box) do
    s = s .. v .. ' '
end
print(s)

-- __call: func(args)
box = setmetatable({}, {
    __call = function(lhs, rhs)
        for i = 1, #rhs do
            lhs[i] = rhs[i]
        end
    end
})

box({1, 2, 3})

s = ''
for _, v in pairs(box) do
    s = s .. v .. ' '
end
print(s)

-- __tostring 用于修改表的输出行为
box = setmetatable({
    1, 2, 3, 4, 5
}, {
    __tostring = function(table)
        local sum = 0
        for _, v in pairs(table) do
            sum = sum + v
        end
        return 'sum: ' .. sum
    end
})

print(box)
