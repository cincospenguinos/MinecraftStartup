# frozen_string_literal: true
class User < ApplicationRecord
  validates_presence_of :name
  validates :email_address, uniqueness: true, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  has_secure_password

  def accept_user!
    update_attributes!(accepted: true)
  end
end
