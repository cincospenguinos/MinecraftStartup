module SpigotInterface
  class Server
    ACCEPTED_COMMANDS = %w(status start stop players notify).freeze
    attr_reader :spigot

    def initialize(port, spigot_connection = nil)
      @server = TCPServer.new(port)
      @spigot = spigot_connection || SpigotInterface::SpigotConnection.new
    end

    def handle
      client = @server.accept
      command = client.gets.chomp

      if ACCEPTED_COMMANDS.include?(command)
        response = spigot.submit_command(command)
        client.puts(response)
      else
        client.puts('not_accepted')
      end

      client.close
    end

    def close
      @server.close
    end
  end
end
