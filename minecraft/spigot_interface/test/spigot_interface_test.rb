# frozen_string_literal: true

require "test_helper"

class SpigotInterfaceTest < Test::Unit::TestCase
  test "VERSION" do
    assert do
      ::SpigotInterface.const_defined?(:VERSION)
    end
  end
end
