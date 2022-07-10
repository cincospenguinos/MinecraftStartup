#!/usr/bin/env ruby
require 'fileutils'

puts 'Checking for minecraft files...'
has_minecraft = Dir['/root/minecraft/**.jar'].any? { |f| f.include?('minecraft-server.jar') }
unless has_minecraft
	puts 'Minecraft server not currently installed. Installing...'
	FileUtils.mv('/tmp/build_spigot/minecraft-server.jar', '/root/minecraft')
	puts `java -jar minecraft-server.jar`
	FileUtils.rm('eula.txt')
	File.open('eula.txt', 'w') { |f| f.puts "eula=true" }
	FileUtils.mkdir_p('plugins')
	FileUtils.mv('/tmp/spigot_plugin/AndreServerPlugin.jar', 'plugins/')
	puts 'Done.'
end

puts 'Starting spigot interface server...'
Process.exec("spigot_interface serve #{ENV['MINECRAFT_STATUS_PORT']}")
