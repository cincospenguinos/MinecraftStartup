module SpigotInterface
  class SpigotConnection
    def start
      return 'OK' if status == 'ONLINE'
      pid = Process.fork { `#{ENV['MINECRAFT_STARTUP_COMMAND']}` }
      Process.detach(pid)
      'OK'
    end

    def stop
      return 'OK' if status == 'OFFLINE'
      submit_command('stop')
    end

    def notify
      submit_command('notify')
    end

    def status
      submit_command('status')
    rescue
      'OFFLINE'
    end

    def players
      return '0' unless status == 'ONLINE'
      submit_command('players')
    end

    private

    def submit_command(command)
      client = TCPSocket.new(ENV['SPIGOT_HOST_NAME'], ENV['SPIGOT_PORT'])
      client.puts(command)
      response = client.gets.chomp
      client.close
      response
    end
  end
end
