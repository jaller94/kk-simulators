function draw_dorf(file, x, y, size, color)
	size = size/2 or 15
	color = color or "#b3b3b3"

	file:write([[  <path
     sodipodi:type="arc"
     style="fill:]]..color..[[;fill-opacity:1;stroke:#4d4d4d;stroke-width:0.5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0"
     sodipodi:cx="]]..x..[["
     sodipodi:cy="]]..y..[["
     sodipodi:rx="]]..size..[["
     sodipodi:ry="]]..size..[[" />
]])
end

function svg_header(file)
	file:write([[<?xml version="1.0" encoding="UTF-8" standalone="no"?>

<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   width="3030"
   height="3030"
   version="1.1">
]])
end

function draw_miniworld(file, world)
	svg_header(file)
	for i, dorf in ipairs(world) do
		if dorf.population > 0 then
			color = "#63d464"
		else
			color = "#b3b3b3"
		end
		draw_dorf(file, dorf.x/10+1515, dorf.y/10+1515, 25, color)
	end
	file:write("</svg>")
end