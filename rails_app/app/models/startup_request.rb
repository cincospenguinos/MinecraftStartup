# frozen_string_literal: true

class StartupRequest < ApplicationRecord
  belongs_to :user

  def complete!
    update!(complete: true)
  end

  def self.pending?
    return false if StartupRequest.count.zero?

    !StartupRequest.last.complete?
  end
end
