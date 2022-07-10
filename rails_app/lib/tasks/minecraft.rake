# frozen_string_literal: true

require 'spigot/spigot_interface'

namespace :minecraft do
  desc 'start the server in the directory provided'
  task :start, [:path] => :environment do |_, args|
    status = spigot.status
    handle_server_request if StartupRequest.pending? && status == :offline

    if StartupRequest.last.notify?
      child = Process.fork { wait_and_notify }
      Process.detach(child)
    end
  end

  def spigot
    @spigot ||= ::Spigot::SpigotInterface.new(ENV['MINECRAFT_STATUS_PORT'])
  end

  def handle_server_request
    request = StartupRequest.last
    response = spigot.start
    request.complete! if response == :ok
    puts "Could not start server! Response was #{response}" unless response == :ok
  end

  def wait_and_notify
    spigot = ::Spigot::SpigotInterface.new(ENV['MINECRAFT_STATUS_PORT'])
    request = StartupRequest.last

    10.times do
      sleep 1.minutes
      if spigot.status == :online
        spigot.notify
        request.update!(notify: false)
        return
      end
    end
  end

  desc 'stop the server if it is time'
  task stop: :environment do
    interface = ::Spigot::SpigotInterface.new(ENV['MINECRAFT_STATUS_PORT'])
    status = interface.status

    interface.stop if status == :online && !in_time_provision && no_players?(interface)
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
