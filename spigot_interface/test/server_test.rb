# frozen_string_literal: true
require "test_helper"
require "ostruct"

class ClientTest < Test::Unit::TestCase
  class MockSpigotConnection
    attr_reader :responses

    def initialize(responses)
      @responses = responses
    end

    def submit_command(cmd)
      raise RuntimeError.new("No response for #{cmd}") unless responses.keys.include?(cmd)
      responses[cmd]
    end
  end

  test "server responds with online when the server is online" do
    spigot_connection = MockSpigotConnection.new({ 'status' => :online })
    server = SpigotInterface::Server.new(6667, spigot_connection)
    Thread.new { server.handle }
    sleep 0.1
    client = SpigotInterface::Client.new('localhost', 6667)
    response = client.submit_command('status')
    assert_equal(:online, response)
  end

  test "server responds with not_accepted when receiving an unknown command" do
    server = SpigotInterface::Server.new(6668)
    Thread.new { server.handle }
    sleep 0.1
    client = SpigotInterface::Client.new('localhost', 6668)
    response = client.submit_command('nope')
    assert_equal(:not_accepted, response)
  end
end