# frozen_string_literal: true

require 'test_helper'

class StatusControllerTest < ActionDispatch::IntegrationTest
  test '#status responds success' do
    get '/status'
    assert_response :success
  end

  test '#status responds with "offline" when offline and no requests pending' do
    mock_interface(:offline)
    get '/status'
    json_body = JSON.parse(response.body)
    assert_equal 'offline', json_body['status']
  end

  test '#status responds with "pending" when offline and request pending' do
    mock_interface(:offline)
    StartupRequest.create!(user: users(:one))
    get '/status'
    json_body = JSON.parse(response.body)
    assert_equal 'pending', json_body['status']
  end

  def mock_interface(status_response)
    offline_interface = Minitest::Mock.new
    offline_interface.expect :status, status_response
    offline_interface
  end
end
