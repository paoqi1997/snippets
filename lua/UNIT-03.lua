--[[
    Version: 5.3.4
    Theme: Lua之控制流
--]]

i = 0
while (i < 10)      -- while loop
do
    print(i)
    i = i + 1
end

for j = 1, 10, 3 do -- numerical for loop
    print(j)
end

toolkits = {'GTK+', 'MFC', 'Qt', 'WinForms', 'wxWidgets'}

-- generic for loop
for i, v in ipairs(toolkits) do
    print(i .. ' : ' .. v)
end

-- repeat loop
i = 0
repeat
    print(i)
    i = i + 1
until (i >= 10)

-- if-else statement
city = 'Chengdu'
if (city == 'Beijing')       -- 北京
then
    print('North China')
elseif (city == 'Shanghai')  -- 上海
then
    print('East China')
elseif (city == 'Guangzhou') -- 广州
then
    print('South China')
elseif (city == 'Shenzhen')  -- 深圳
then
    print('South China')
else
    print('Southwest China')
end
