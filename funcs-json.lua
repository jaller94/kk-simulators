m = {} -- module array

function m.indent(output, indentlevel)
	output:write("\n" .. string.rep("  ", indentlevel))
end

function m.export_value(output, value, indentlevel)
	-- set standard
	indentlevel = indentlevel or 0

	-- intend
	m.indent(output, indentlevel)

	-- detect type
	local typ = type(value)
	if (typ == "string") then
		-- TODO escape string
		output:write("\"" .. value .. "\"")
	elseif (typ == "number") then
		output:write(value)
	elseif (typ == "boolean") then
		output:write(value)
	elseif (typ == "nil") then
		output:write("null")
	elseif (typ == "table") then
		output:write("{")

		local first = true
		for k,v in pairs(value) do
			if (first) then
				first = false
			else
				output:write(",")
			end

			m.indent(output, indentlevel+1)

			-- TODO escape key
			output:write("\"" .. k .. "\": ")
			m.export_value(output, v, indentlevel+2)
		end
		m.indent(output, indentlevel)
		output:write("}")
	end
end

return m
