require 'test_helper'

class StartupControllerTest < ActionDispatch::IntegrationTest
  test '#index responds okay' do
    get '/'
    assert_response :success
  end

  test '#startup accepts valid email address and password' do
    valid_user = create_valid_user
    params = { email_address: valid_user.email_address, password: 'password', notify: false }
    post '/startup', params: params
    assert_response :success
  end

  test '#startup rejects invalid email address' do
    params = { email_address: 'notreal@email.net', password: 'password', notify: false }
    post '/startup', params: params
    assert_response :bad_request
  end

  test '#startup rejects invalid password' do
    valid_user = create_valid_user
    params = { email_address: valid_user.email_address, password: 'notthepassword', notify: false }
    post '/startup', params: params
    assert_response :bad_request
  end

  test '#startup rejects unaccepted user' do
    unaccepted_user = create_valid_user(false)
    params = { email_address: unaccepted_user.email_address, password: 'password', notify: false }
    post '/startup', params: params
    assert_response :bad_request
  end

  test '#startup creates request when one is not pending' do
    assert_changes 'StartupRequest.pending?' do
      valid_user = create_valid_user
      params = { email_address: valid_user.email_address, password: 'password', notify: false }
      post '/startup', params: params
    end
  end

  test '#startup does not create a request when one is pending' do
    valid_user = create_valid_user
    StartupRequest.create!(user: valid_user)
    assert_no_changes 'StartupRequest.count' do
      params = { email_address: valid_user.email_address, password: 'password', notify: false }
      post '/startup', params: params
      assert_response :success
    end
  end

  test '#startup sets notify field' do
    valid_user = create_valid_user
    params = { email_address: valid_user.email_address, password: 'password', notify: true }
    post '/startup', params: params
    assert_response :success
    assert StartupRequest.last.notify?
  end

  private

  def create_valid_user(accept_user = true)
    user = User.create!(name: 'Joe', email_address: 'joe@joe.joe',
                 password: 'password',
                 password_confirmation: 'password')
    user.accept! if accept_user
    user
  end
end
