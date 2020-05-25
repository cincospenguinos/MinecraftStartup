require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'passwords matching works' do
    valid_user = User.new(name: 'Joe', email_address: 'yo@joe.com', password: 'heythere',
                          password_confirmation: 'heythere')
    assert valid_user.valid?
  end

  test 'password mismatch does not work' do
    invalid_user = User.new(name: 'Joe', email_address: 'yo@joe.com', password: 'heythere',
                          password_confirmation: 'nope')
    assert !invalid_user.valid?
  end

  test 'name required' do
    invalid_user = User.new(email_address: 'yo@joe.com', password: 'heythere',
                          password_confirmation: 'heythere')
    assert !invalid_user.valid?
  end

  test 'email address required' do
    invalid_user = User.new(name: 'Joe', password: 'heythere', password_confirmation: 'heythere')
    assert !invalid_user.valid?
  end

  test 'accepted defaults to false' do
    valid_user = User.new(name: 'Joe', email_address: 'yo@joe.com', password: 'heythere',
                          password_confirmation: 'heythere')
    valid_user.save!
    assert !valid_user.accepted
  end

  test '#accept_user! accepts the user' do
    valid_user = User.create!(name: 'Joe', email_address: 'yo@joe.com',
                              password: 'heythere',
                              password_confirmation: 'heythere')
    valid_user.accept_user!
    assert valid_user.accepted
  end
end
