# frozen_string_literal: true
require "test_helper"
require "ostruct"

class ClientTest < Test::Unit::TestCase
  def spin_up_server(port, connection)
    server = SpigotInterface::Server.new(port, connection)
    Thread.new { server.handle }
    sleep 0.1
  end

  test "server responds with online when the server is online" do
    spigot_connection = OpenStruct.new(status: 'ONLINE')
    spin_up_server(6667, spigot_connection)
    client = SpigotInterface::Client.new('localhost', 6667)
    response = client.submit_command('status')
    assert_equal(:online, response)
  end

  test "server responds with not_accepted when receiving an unknown command" do
    spin_up_server(6668, OpenStruct.new(status: 'ONLINE'))
    client = SpigotInterface::Client.new('localhost', 6668)
    response = client.submit_command('nope')
    assert_equal(:not_accepted, response)
  end

  test "server responds with OK when starting with the server offline" do
    spigot_connection = OpenStruct.new(status: 'OFFLINE', start: 'OK')
    spin_up_server(6669, spigot_connection)
    client = SpigotInterface::Client.new('localhost', 6669)
    response = client.submit_command('start')
    assert_equal(:ok, response)
  end

  test "server responds with OK when starting with server online" do
    spigot_connection = OpenStruct.new(status: 'ONLINE', start: 'OK')
    spin_up_server(6670, spigot_connection)
    client = SpigotInterface::Client.new('localhost', 6670)
    response = client.submit_command('start')
    assert_equal(:ok, response)
  end

  test "server responds with number of players for players request" do
    spin_up_server(6672, OpenStruct.new(status: 'ONLINE', players: '12'))
    client = SpigotInterface::Client.new('localhost', 6672)
    response = client.submit_command('players')
    assert_equal(12, response)
  end
end