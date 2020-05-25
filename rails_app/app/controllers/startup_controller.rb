# frozen_string_literal: true

class StartupController < ApplicationController
  def index
    @csrf_token = form_authenticity_token
  end

  def startup
    if valid_startup_request
      StartupRequest.create!(user: @user) unless StartupRequest.pending?
      render json: {}
    else
      render json: { error: 'bad request' }, status: :bad_request
    end
  end

  private

  def user
    @user ||= User.find_by(email_address: startup_params[:email_address])
  end

  def valid_startup_request
    return false unless user&.accepted?

    user.authenticate(startup_params[:password])
  end

  def startup_params
    params.permit(:email_address, :password)
  end
end
