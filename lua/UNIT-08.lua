--[[
    Version: 5.3.4
    Theme: Lua之元表
--]]

-- __add <-> +
-- __sub <-> -
-- __mul <-> *
-- __div <-> /
-- __mod <-> %
-- __pow <-> ^

-- __unm  <-> unary -
-- __idiv <-> //

-- __band <-> AND                 (&)
-- __bor  <-> OR                  (|)
-- __bxor <-> exclusive OR (binary ~)
-- __bnot <-> NOT           (unary ~)
-- __shl  <-> left shift         (<<)
-- __shr  <-> right shift        (>>)

-- __concat <-> ..
-- __len    <-> #

-- __eq <-> equal      (==)
-- __lt <-> less than   (<)
-- __le <-> less equal (<=)

-- __index    <-> table[key]
-- __newindex <-> table[key] = value
-- __call     <-> func(args)

-- the first layer
place1 = setmetatable -- num of __index: 1
(
    { city = 'Guangzhou' }, { __index = { province = 'Guangdong' } }
)

-- the first layer
place2 = setmetatable -- num of __index: 2
(
    { city = 'Guangzhou' },
    {
        -- the second layer
        __index = setmetatable
        (
            { province = 'Guangdong' }, { __index = { country = 'China' } }
        )
    }
)

-- Guangzhou - Guangdong
print(place1.city .. ' - ' .. place1.province)

-- Guangzhou - Guangdong - China
print(place2.city .. ' - ' .. place2.province .. ' - ' .. place2.country)

socket = setmetatable
(
    { ip_address = '127.0.0.1' },
    {
        __index =
        function(table, key)
            if key == 'port' then return 8080 end
        end
    }
)

-- 127.0.0.1:8080
print(socket.ip_address .. ':' .. socket.port)

bag = {}

character = setmetatable({ hp = 144, mp = 90 }, { __newindex = bag })

character.bandage = 1

-- hp(144)|mp(90)
for i, v in pairs(character) do
    print('character: ' .. i .. '(' .. v .. ')')
end

-- bandage(1)
for i, v in pairs(bag) do
    print('bag: ' .. i .. '(' .. v .. ')')
end

character.hp = 256

-- hp(256)|mp(90)
for i, v in pairs(character) do
    print('character: ' .. i .. '(' .. v .. ')')
end

-- bandage(1)
for i, v in pairs(bag) do
    print('bag: ' .. i .. '(' .. v .. ')')
end

project = setmetatable
(
    { browser = 'Chrome' },
    {
        __newindex =
        function(table, key, value)
            rawset(table, key, value .. '.js')
        end
    }
)

project.framework = 'Vue'

-- Chrome  Vue.js
print(project.browser, project.framework)

box1 = setmetatable
(
    {1, 3, 5, 7, 9},
    {
        __add =
        function(lhs, rhs)
            local cnt = 0
            if #lhs < #rhs then
                cnt = #lhs
            else
                cnt = #rhs
            end
            for i = 1, cnt do
                lhs[i] = lhs[i] + rhs[i]
            end
            return lhs
        end
    }
)

box1 = box1 + {2, 4, 6, 8, 10}

-- 3 7 11 15 19
for i, v in pairs(box1) do
    print(i .. ' - ' .. v)
end

box2 = setmetatable
(
    {},
    {
        __call =
        function(lhs, rhs)
            for i = 1, #rhs do lhs[i] = rhs[i] end
        end
    }
)

box2( {1, 2, 3} )

-- 1 2 3
for i, v in pairs(box2) do
    print(i .. ' - ' .. v)
end

box3 = setmetatable
(
    {6, 3, 2, 4},
    {
        __tostring =
        function(table)
            local sum = 0
            for i, v in pairs(table) do
                sum = sum + v
            end
            return 'Sum: ' .. sum
        end
    }
)

print(box3) -- Sum: 15
