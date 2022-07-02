env :PATH, ENV['PATH']

every 1.minutes do
	rake 'minecraft:start'
end

every 5.minutes do
	rake 'minecraft:stop'
end
