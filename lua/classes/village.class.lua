-- initialize local class table
local c = {}

-- functions
--- our first function
function c:countkids()
	local kids

	-- 42 is the size of a grown village
	-- additional KKs don't belong here and are youngsters
	kids = (self.population or 0) - 42
	if kids < 0 then kids = 0 end
	
	return kids
end


-- build metatable of objects
c.mt = {}
c.mt.__index = c.mt		-- objects will address __index as their metatable
c.mt.countkids = c.countkids

--- Builds a new object.
function c.new(x, y)
	-- set default parameters
	x = x or 0
	y = y or 0

	-- initialize local object table
	local o = {}

	-- set object variables
	o.x = x
	o.y = y
	o.population = 0
	o.eggdelay = 3

	-- attach our metamethods to our object
	setmetatable(o, c.mt)

	-- return the created object
	return o
end

return c
