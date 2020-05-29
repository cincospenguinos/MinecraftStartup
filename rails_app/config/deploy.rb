# config valid for current version and patch releases of Capistrano
lock "~> 3.14.0"

set :application, "rails_app"
set :repo_url, "git@github.com:cincospenguinos/MinecraftStartup.git"
set :deploy_to, '/home/minecraft/rails_app'
append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', '.bundle', 'public/system', 'public/uploads'
set :keep_releases, 3
set :bundle_gemfile, 'rails_app/Gemfile'
