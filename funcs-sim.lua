function new_dorf(x, y)
	local dorf = {}
	dorf.x = x
	dorf.y = y
	dorf.population = 0
	dorf.eggdelay = 3
	return dorf
end

function add_kidswalk(destination, length)
	local walk = {}
	walk.destination = destination
	walk.length = length
	return walk
end

function new_world()
	print("generating world...")
	local world = {}

	world.kidswalks = {}
	world.add_kidswalk = function (world, destination, length)
		local walk = {}
		walk.destination = destination
		walk.length = length
		table.insert(world.kidswalks, walk)
	end

	-- Erstelle Urdorf
	local dorf
	dorf = new_dorf(1, 0, 0)
	dorf.population = 42
	world[1] = dorf

	local id = 2
	-- Erstelle alle anderen Dörfer
	for i = 1, 50 do
		for i2 = 0, (i*6)-1 do
			-- circular
			--local x = math.sin(math.rad(i2/(i*6)*360))*300*i
			--local y = math.cos(math.rad(i2/(i*6)*360))*300*i

			local line = math.floor(i2/i)
			local inline = math.floor(i2%i)
			print(line, inline)
			local x = math.sin(math.rad(line/6*360))*300*i
			local y = math.cos(math.rad(line/6*360))*300*i
			x = x + math.sin(math.rad((line+2)/6*360))*300*inline
			y = y + math.cos(math.rad((line+2)/6*360))*300*inline
			print(x,y)

			world[id] = new_dorf(x, y)

			id = id +1
		end
	end

	-- dorf 1 is settled and is currently hatching for dorf 2
	-- next up for hatching will be dorf 3
	world.nextdorf = 2
	
	print("world finished!")

	return world
end



function step(world, step)
	local step = step or 0
	for i = 1, 7651 do
		local dorf = world[i]

		-- start hatching
		if dorf.kidsdorf == nil and dorf.population == 42 then
			-- check if there still is an empty dorf in this world
			if world.nextdorf <= 7651 then
				dorf.kidsdorf = world.nextdorf
				world.nextdorf = world.nextdorf +1
			end
		end

		-- reproduction
		-- only possible with 2 KKs and a destination dorf
		if dorf.kidsdorf ~= nil and dorf.population >= 2 then
			-- eggs need 3 months to hatch
			-- this prevents eggs to hatch in the first 3 months of a dorf
			if dorf.eggdelay > 0 then
				dorf.eggdelay = dorf.eggdelay -1
			else
				dorf.population  = dorf.population +1
			end
		end

		-- kids leave the dorf
		if dorf.population == 84 then
			-- kids complete
			
			-- kids need time to walk to their dorf
			local x1, y1 = dorf.x, dorf.y
			local x2, y2 = world[dorf.kidsdorf].x, world[dorf.kidsdorf].y
			local xd = x2 - x1
			local yd = y2 - y1
			local length = math.sqrt(xd*xd + yd*yd)

			world:add_kidswalk(dorf.kidsdorf, length)
			print(step, "Kids "..dorf.kidsdorf.." gestartet!")

			-- dorf is ready to hatch for another dorf
			dorf.population = 42
			dorf.kidsdorf = nil
		end
	end

	-- kids walk
	local finished = {}
	for k, walk in pairs(world.kidswalks) do
		walk.length = walk.length -1000
		if (walk.length <= 0) then
			world[walk.destination].population = 42
			print(step, "Dorf "..walk.destination.." besiedelt!")
			table.insert(finished, k)
		end
	end

	-- remove finished walks
	for k, v in ipairs(finished) do
		world.kidswalks[v] = nil
	end
end
