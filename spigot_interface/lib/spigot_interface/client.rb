require 'timeout'
require 'socket'

module SpigotInterface
  class Client
    attr_reader :host, :port

    def initialize(host, port)
      @host = host
      @port = port
    end

    def submit_command(command)
      client = TCPSocket.new(host, port)
      client.puts(command)
      response = client.gets.chomp
      client.close
      response.downcase.to_sym
    rescue Errno::ECONNREFUSED
      :offline
    end
  end
end