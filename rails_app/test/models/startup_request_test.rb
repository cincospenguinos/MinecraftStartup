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
end
