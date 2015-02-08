require "funcs-sim"
require "funcs-svg"

function screen(world, step)
	step = string.rep("0", 3-tostring(step):len()) .. step

	local file = io.open("svgs/world"..step..".svg","w")
	draw_miniworld(file, world)
	file:close()

	os.execute("inkscape -w1080 -h1080 -e tmp.png svgs/world"..step..".svg")
	os.execute("pngcrush -c 2 -m 7 tmp.png pngs/world"..step..".png")
end


local world = new_world()
local input = io.read()

for i = 1, 625 do
	step(world, i)
	screen(world, i)
end

local input = io.read()
