class StartupController < ApplicationController
  def index
    @csrf_token = form_authenticity_token
  end

  def startup
    if valid_startup_request
      render json: {}
    else
      render json: { error: 'bad username or password' }, status: :bad_request
    end
  end

  private

  def valid_startup_request
    user = User.find_by(email_address: startup_params[:email_address])
    return false unless user&.accepted?

    user.authenticate(startup_params[:password])
  end

  def startup_params
    params.permit(:email_address, :password)
  end
end
