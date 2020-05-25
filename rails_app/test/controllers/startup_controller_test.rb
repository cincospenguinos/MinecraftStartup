require 'test_helper'

class StartupControllerTest < ActionDispatch::IntegrationTest
  test '#index responds okay' do
    get '/'
    assert_response :success
  end

  test '#startup accepts valid email address and password' do
    valid_user = create_valid_user
    params = { email_address: valid_user.email_address, password: 'password' }
    post '/startup', params: params
    assert_response :success
  end

  test '#startup rejects invalid email address' do
    params = { email_address: 'notreal@email.net', password: 'password' }
    post '/startup', params: params
    assert_response :bad_request
  end

  test '#startup rejects invalid password' do
    valid_user = create_valid_user
    params = { email_address: valid_user.email_address, password: 'notthepassword' }
    post '/startup', params: params
    assert_response :bad_request
  end

  private

  def create_valid_user
    User.create!(name: 'Joe', email_address: 'joe@joe.joe',
                 password: 'password',
                 password_confirmation: 'password')
  end
end
