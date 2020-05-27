# frozen_string_literal: true

require 'test_helper'
require 'spigot/spigot_interface'

class StatusControllerTest < ActionDispatch::IntegrationTest
  test '#status responds success' do
    get '/status'
    assert_response :success
  end

  test '#status responds with "offline" when offline and no requests pending' do
    mock_interface = mock_interface(:offline)

    ::Spigot::SpigotInterface.stub :new, mock_interface do
      get '/status'
      json_body = JSON.parse(response.body)
      assert_equal 'offline', json_body['status']
    end
  end

  test '#status responds with "pending" when offline and request pending' do
    StartupRequest.create!(user: users(:one))
    mock_interface = mock_interface(:offline)

    ::Spigot::SpigotInterface.stub :new, mock_interface do
      get '/status'
      json_body = JSON.parse(response.body)
      assert_equal 'pending', json_body['status']
    end
  end

  test '#status repsonds with "online" when the server is online' do
    mock_interface = mock_interface(:online)

    ::Spigot::SpigotInterface.stub :new, mock_interface do
      get '/status'
      json_body = JSON.parse(response.body)
      assert_equal 'online', json_body['status']
    end
  end

  def mock_interface(status_response)
    mock_interface = Minitest::Mock.new
    mock_interface.expect :status, status_response
    mock_interface
  end
end
