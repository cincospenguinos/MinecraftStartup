require_relative 'spigot_connection'

module SpigotInterface
  class Server
    ACCEPTED_COMMANDS = (SpigotInterface::SpigotConnection.instance_methods - Object.instance_methods).freeze
    attr_reader :spigot

    def initialize(port, spigot_connection = nil)
      @server = TCPServer.new(port)
      @spigot = spigot_connection || SpigotInterface::SpigotConnection.new
    end

    def handle
      client = @server.accept
      command = client.gets.chomp.to_sym
      puts "Received command \"#{command}\""
      response = 'not_accepted'

      if ACCEPTED_COMMANDS.include?(command)
        response = ask_spigot(command)
      end

      puts "Responding with \"#{response}\""

      client.puts(response)
      client.close
    end

    def close
      @server.close
    end

    private

    def ask_spigot(command)
      spigot.send(command)
    rescue
      'offline'
    end
  end
end
