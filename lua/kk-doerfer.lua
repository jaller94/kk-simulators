function draw(x,y)
	print([[  <path
     sodipodi:type="arc"
     style="fill:#b3b3b3;fill-opacity:1;stroke:#4d4d4d;stroke-width:0.5;stroke-linecap:round;stroke-linejoin:miter;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0"
     sodipodi:cx="]]..x..[["
     sodipodi:cy="]]..y..[["
     sodipodi:rx="15"
     sodipodi:ry="15" />]])
end



local distance = 300


print(0,0)
for i=0,5 do
	local x = math.sin(math.rad(i/6*360))*300
	local y = math.cos(math.rad(i/6*360))*300
	draw(x,y)
end
