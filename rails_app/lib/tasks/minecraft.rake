# frozen_string_literal: true

require 'spigot/spigot_interface'

namespace :minecraft do
  desc 'start the server in the directory provided'
  task :start, [:path] => :environment do |_, args|
    status = ::Spigot::SpigotInterface.new(25_566).status

    handle_server_request if StartupRequest.pending? && status == :offline
  end

  def handle_server_request
    request = StartupRequest.last
    Dir.chdir(ENV['MINECRAFT_SERVER_PATH']) { start_server }
    request.complete!
  end

  def start_server
    startup_cmd = "screen -L -dmS minecraft java -jar #{ENV['MINECRAFT_JAR']} #{ENV['MINECRAFT_JAR_ARGS']}"
    pid = Process.spawn(startup_cmd)
    Process.detach(pid)
  end

  desc 'stop the server if it is time'
  task stop: :environment do
    interface = ::Spigot::SpigotInterface.new(25_566)
    status = interface.status
    return unless status == :online

    interface.stop if !in_time_provision && no_players?(interface)
  end

  def in_time_provision
    last_request_time = StartupRequest.last.updated_at
    minutes = (Time.now - last_request_time) / 60
    minutes <= 10
  end

  def no_players?(interface)
    interface.count_current_players.zero?
  end
end
