# frozen_string_literal: true

require 'socket'

module Spigot
  class SpigotInterface
    def initialize(port)
      @port = port
    end

    def status
      response = submit_command('status')
      return :online unless response.nil?

      :offline
    end

    private

    def submit_command(cmd)
      socket = TCPSocket.new('localhost', @port)
      socket.print(cmd + "\n")
      response = socket.gets.chomp
      socket.close
      response.downcase.to_sym
    rescue Errno::ECONNREFUSED
      nil
    end
  end
end