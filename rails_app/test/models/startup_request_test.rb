require 'test_helper'

class StartupRequestTest < ActiveSupport::TestCase
  test 'defaults to incomplete' do
    user = users(:one)
    request = StartupRequest.create!(user: user)
    assert_equal false, request.complete?
  end

  test '#complete! sets complete to true' do
    user = users(:one)
    request = StartupRequest.create!(user: user)
    request.complete!
    assert request.complete?
  end

  test '#pending? returns false when none exist' do
    assert !StartupRequest.pending?
  end

  test '#pending? returns false when the last one was completed' do
    request = StartupRequest.create!(user: users(:one))
    request.complete!
    assert !StartupRequest.pending?
  end

  test '#pending? returns true when the last one is not complete' do
    StartupRequest.create!(user: users(:one))
    assert StartupRequest.pending?
  end
end
