# frozen_string_literal: true

require "test_helper"

class ClientTest < Test::Unit::TestCase
  test "client responds with offline when cannot connect" do
    client = SpigotInterface::Client.new('localhost', 6666)
    response = client.submit_command('status')
    assert_equal(:offline, response)
  end

  test "client responds with online when the service can connect" do
    server = MockServer.new(9876, { 'status' => :online })
    Thread.start { server.handle }
    sleep 0.1
    client = SpigotInterface::Client.new('localhost', 9876)
    response = client.submit_command('status')
    assert_equal(:online, response)
  end
end