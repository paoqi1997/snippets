--[[
    Version: 5.3.4
    Theme: Lua之面向对象
--]]

-- Circle Class
circle = { radius = 0, area = 0 }

function circle:new(radius)
    obj = {}
    setmetatable(obj, self)
    self.__index = self
    --[[
    obj = setmetatable( {}, { __index = self } )
    --]]
    self.radius = radius
    self.area = 3.1415926 * radius ^ 2
    return obj
end

function circle:getarea()
    return self.area
end

print(circle:new(4):getarea())

-- Shape Class
shape = { isbase = true, area = 0 }

function shape:new()
    obj = setmetatable( {}, { __index = self } )
    return obj
end

function shape:getarea()
    return self.area
end

print(shape:new():getarea())

-- Square Class
square = shape:new()

function square:new(side)
    obj = setmetatable( shape:new(), { __index = self } )
    self.isbase = false
    self.area = side * side
    return obj
end

function square:getarea()
    return self.area
end

print(square:new(4):getarea())
