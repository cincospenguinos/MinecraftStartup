# frozen_string_literal: true
require 'socket'

module Spigot
  class SpigotInterface
    def initialize(port)
      @port = port
    end

    def status
      submit_command('status')
    end

    def count_current_players
      response = submit_command('players')
      response.to_s.to_i || :error
    end

    def stop
      submit_command('stop')
    end

    def notify
      submit_command('notify')
    end

    private

    def submit_command(cmd)
      socket = TCPSocket.new(ENV['MINECRAFT_SERVICE_NAME'], @port)
      socket.puts(cmd)
      response = socket.gets.chomp
      socket.close
      response.downcase.to_sym
    rescue Errno::ECONNREFUSED
      nil
    end
  end
end
