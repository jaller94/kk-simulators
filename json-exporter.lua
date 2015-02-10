-- unnamed imports
require "funcs-sim"

-- named imports
json = require "funcs-json"


-- require two start parameter
if (arg[1] ~= nil or arg[2] ~= nil) then

	-- process 1st parameter: output
	local output
	if (arg[1] == "-") then
		-- open console output
		output = io.stdout
	else
		-- open file in write mode
		output = assert(io.open(arg[1],"w"))
	end
	
	-- process 2nd parameter: content
	if (arg[2] == "world") then
		-- generate a world
		local world = new_world()

		-- dump lua value to json output
		json.export_value(output, world)

		-- exit program successfully
		os.exit(0)
	end
else
	print("Unknown parameter!")
end

print("parameter: <output file> <content>")
print("possible content: world")

-- tell the system execution failed
os.exit(1)
