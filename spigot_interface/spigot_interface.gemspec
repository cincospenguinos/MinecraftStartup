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

  spec.metadata["allowed_push_host"] = "https://rubygems.pkg.github.com/cincospenguinos"

  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = spec.homepage
  spec.metadata["changelog_uri"] = spec.homepage

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files = Dir.chdir(__dir__) do
    `git ls-files -z`.split("\x0").reject do |f|
      (f == __FILE__) || f.match(%r{\A(?:(?:bin|test|spec|features)/|\.(?:git|travis|circleci)|appveyor)})
    end
  end
  spec.bindir = "bin"
  spec.executables = %w(spigot_interface)
  spec.require_paths = ["lib"]

  spec.add_dependency 'thor', '~> 1.2'
end
