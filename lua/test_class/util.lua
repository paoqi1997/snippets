-- Lua之模块

shape = {}
function shape:new()
    obj = setmetatable({}, {
        __index = self
    })
    return obj
end

function shape:getName()
    return self.name
end

circle = shape:new()
function circle:new()
    obj = {}
    setmetatable(obj, self)
    self.__index = self
    self.name = 'circle'
    return obj
end

square = shape:new()
function square:new()
    obj = {}
    setmetatable(obj, self)
    self.__index = self
    self.name = 'square'
    return obj
end

function square:getName()
    return 'name: ' .. self.name
end

module = {}
module.circle = circle
module.square = square

return module
