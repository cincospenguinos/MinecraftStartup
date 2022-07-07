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
      response = response_for(command)
      return response.to_i if response =~ /\d+/
      response.downcase.to_sym
    rescue Errno::ECONNREFUSED
      :offline
    end

    private

    def response_for(command)
      client = TCPSocket.new(host, port)
      client.puts(command)
      response = client.gets.chomp
      client.close
      response
    end
  end
end