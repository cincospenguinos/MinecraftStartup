class StartupRequest < ApplicationRecord
  belongs_to :user

  def complete!
    update!(complete: true)
  end
end
