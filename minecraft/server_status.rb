#!/usr/bin/env ruby
require 'socket'

class StatusHandler
  RECOGNIZED_COMMANDS = %w(players start stop status)

  attr_reader :shutdown

  def initialize
    @shutdown = false
  end

  def handle(command)
    return 'ERROR' unless RECOGNIZED_COMMANDS.include?(command)
    self.send(command)
  end

  private

  def start
    pid = Process.fork { start_minecraft }
    Process.detach(pid)
    @shutdown = true
    'OK'
  end

  def stop
    'OK'
  end

  def status
    'OFF'
  end

  def players
    '0'
  end

  def start_minecraft
    `#{ENV['MINECRAFT_STARTUP_COMMAND']}`
  end
end

server = TCPServer.new("0.0.0.0", ENV['MINECRAFT_STATUS_PORT'])
handler = StatusHandler.new

while !handler.shutdown do
  socket = server.accept
  command = socket.gets.chomp
  socket.puts handler.handle(command)
end
