--[[
    Version: 5.3.4
    Theme: Lua之iterator及table
--]]

function factorial(border, num)
    if (num < border) then
        num = num + 1
        local cnt = 1
        for i = 1, num do cnt = cnt * i end
        return num, cnt
    end
end

-- for namelist in explist do block end

-- f, s, var = explist

for i, v in factorial, 5, 0 do print(i, v) end

ltable = {}

ltable[1] = 2; ltable['j'] = 4

for i, v in pairs(ltable) do
    print('ltable: ' .. i .. ' - ' .. v)
end

rtable = ltable

rtable[1] = 6; rtable['k'] = 8

for i, v in pairs(rtable) do
    print('rtable: ' .. i .. ' - ' .. v)
end

rtable = nil

for i, v in pairs(ltable) do
    print('ltable: ' .. i .. ' - ' .. v)
end

ltable = nil

skills = {'C/C++', 'Docker', 'Node.js', 'Vulkan'}

-- C/C++ | Docker | Node.js
print(table.concat(skills, ' | ', 1, 3))

table.insert(skills, 3, 'Nginx')

for i, v in pairs(skills) do
    print('After insert: ' .. i .. ' - ' .. v)
end

table.remove(skills, 3)

for i, v in pairs(skills) do
    print('After remove: ' .. i .. ' - ' .. v)
end

table.sort
(
    skills,
    function(a, b)
        return string.len(a) < string.len(b)
    end
)

for i, v in pairs(skills) do
    print('After sort: ' .. i .. ' - ' .. v)
end
