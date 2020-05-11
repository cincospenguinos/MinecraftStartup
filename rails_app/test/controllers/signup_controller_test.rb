require 'test_helper'

class SignupControllerTest < ActionDispatch::IntegrationTest
  test 'create accepts correct params' do
    valid_params = { user: { name: 'Joe', email_address: 'foo@foo.foo', password: 'password',
                             password_confirmation: 'password' } }
    post '/signup', params: valid_params
    assert_equal(200, response.status)
  end

  test 'create rejects incorrect params' do
    invalid_params = { user: { name: 'Joe', email_address: 'foo', password: 'password',
                             password_confirmation: 'passwordd' } }
    post '/signup', params: invalid_params
    assert_equal(400, response.status)
  end

  test 'create provides errors' do
    invalid_params = { user: { name: 'Joe', email_address: 'foo', password: 'password',
                               password_confirmation: 'passwordd' } }
    post '/signup', params: invalid_params
    json_body = JSON.parse(response.body)
    assert json_body['errors'].keys.include?('password_confirmation')
    assert json_body['errors'].keys.include?('email_address')
  end

  test 'create saves a valid user' do
    old_count = User.count
    valid_params = { user: { name: 'Joe', email_address: 'foo@foo.foo', password: 'password',
                             password_confirmation: 'password' } }
    post '/signup', params: valid_params
    assert_equal(old_count + 1, User.count)
  end
end
