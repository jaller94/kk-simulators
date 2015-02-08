function new_village(x, y)
	local village = {}
	village.x = x
	village.y = y
	village.population = 0
	village.eggdelay = 3
	return village
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

	-- Erstelle Urvillage
	local village
	village = new_village(1, 0, 0)
	village.population = 42
	world[1] = village

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

			world[id] = new_village(x, y)

			id = id +1
		end
	end

	-- village 1 is settled and is currently hatching for village 2
	-- next up for hatching will be village 3
	world.nextvillage = 2
	
	print("world finished!")

	return world
end



function step(world, step)
	local step = step or 0
	for i = 1, 7651 do
		local village = world[i]

		-- start hatching
		if village.kidsvillage == nil and village.population == 42 then
			-- check if there still is an empty village in this world
			if world.nextvillage <= 7651 then
				village.kidsvillage = world.nextvillage
				world.nextvillage = world.nextvillage +1
			end
		end

		-- reproduction
		-- only possible with 2 KKs and a destination village
		if village.kidsvillage ~= nil and village.population >= 2 then
			-- eggs need 3 months to hatch
			-- this prevents eggs to hatch in the first 3 months of a village
			if village.eggdelay > 0 then
				village.eggdelay = village.eggdelay -1
			else
				village.population  = village.population +1
			end
		end

		-- kids leave the village
		if village.population == 84 then
			-- kids complete
			
			-- kids need time to walk to their village
			local x1, y1 = village.x, village.y
			local x2, y2 = world[village.kidsvillage].x, world[village.kidsvillage].y
			local xd = x2 - x1
			local yd = y2 - y1
			local length = math.sqrt(xd*xd + yd*yd)

			world:add_kidswalk(village.kidsvillage, length)
			print(step, "Kids "..village.kidsvillage.." gestartet!")

			-- village is ready to hatch for another village
			village.population = 42
			village.kidsvillage = nil
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
