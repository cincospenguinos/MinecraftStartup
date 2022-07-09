env :PATH, ENV['PATH']
set :output, "log/cron_log.log"
set :environment, 'development'
job_type :rake, "cd :path && MINECRAFT_SERVICE_NAME=#{ENV['MINECRAFT_SERVICE_NAME']} MINECRAFT_STATUS_PORT=#{ENV['MINECRAFT_STATUS_PORT']} :environment_variable=:environment bundle exec rake :task --silent :output"

every 1.minutes do
	rake 'minecraft:start'
end

every 5.minutes do
	rake 'minecraft:stop'
end
