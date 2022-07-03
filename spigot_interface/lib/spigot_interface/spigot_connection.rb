module SpigotInterface
  class SpigotConnection
    def submit_command(command)
      client = TCPSocket.new(ENV['SPIGOT_HOST_NAME'], ENV['SPIGOT_PORT'])
      client.puts(command)
      response = client.gets.chomp
      client.close
      response
    end
  end
end
