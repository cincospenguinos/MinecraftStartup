# frozen_string_literal: true

require_relative "lib/spigot_interface/version"

Gem::Specification.new do |spec|
  spec.name = "spigot_interface"
  spec.version = SpigotInterface::VERSION
  spec.authors = ["Andre LaFleur"]
  spec.email = ["cincospenguinos@gmail.com"]

  spec.summary = "Handles all the rails/spigot interactions"
  spec.description = ""
  spec.homepage = "https://github.com/cincospenguinos/MinecraftStartup"
  spec.license = "MIT"
  spec.required_ruby_version = ">= 2.6.0"

  spec.metadata['github_repo'] = 'git@github.com/cincospenguinos/MinecraftStartup.git'
  spec.metadata["allowed_push_host"] = "https://rubygems.pkg.github.com/cincospenguinos"
  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = spec.homepage
  spec.metadata["changelog_uri"] = spec.homepage

  # I added all of these files individually because we are building this in the context of docker
  spec.files = ["CHANGELOG.md", "CODE_OF_CONDUCT.md", "Gemfile", "Gemfile.lock", "LICENSE.txt", "README.md", "Rakefile", "lib/spigot_interface.rb", "lib/spigot_interface/client.rb", "lib/spigot_interface/server.rb", "lib/spigot_interface/spigot_connection.rb", "lib/spigot_interface/version.rb", "sig/spigot_interface.rbs", "spigot_interface.gemspec"]
  spec.bindir = "bin"
  spec.executables = %w(spigot_interface)
  spec.require_paths = ["lib"]

  spec.add_dependency 'thor', '~> 1.2'
end
