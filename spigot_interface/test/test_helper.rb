# frozen_string_literal: true

$LOAD_PATH.unshift File.expand_path("../lib", __dir__)
require "spigot_interface"

class MockServer
  attr_accessor :responses
  attr_reader :port

  def initialize(port, responses = {})
    @responses = { 'status' => :offline }.merge(responses)
    @port = port
  end

  def handle
    server = TCPServer.new(port)
    client = server.accept
    command = client.gets.chomp
    raise RuntimeError.new("No response set for #{command}") unless responses.keys.include?(command)
    client.puts(responses[command])
    client.close
    server.close
  end
end

require "test-unit"
