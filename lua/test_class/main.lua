-- Lua之面向对象

local util = require('util')

oCircle = util.circle:new()
print(oCircle:getName()) -- circle

oSquare = util.square:new()
print(oSquare:getName()) -- name: square
