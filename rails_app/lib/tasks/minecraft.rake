# frozen_string_literal: true

require 'spigot/spigot_interface'

namespace :minecraft do

  desc 'start the server in the directory provided'
  task :start, [:path] => :environment do |_, args|
    puts ENV['RAILS_ENV']
    status = ::Spigot::SpigotInterface.new(25_566).status

    if StartupRequest.pending? && status == :offline
      request = StartupRequest.last
      Dir.chdir(args[:path]) { `screen -dmS minecraft java -jar spigot.jar nogui` }
      request.complete!
    end
  end
end
