class SignupController < ApplicationController
  def create
    user = User.new(user_params)

    if user.valid?
      user.save!
      SignUpMailer.with(user: user).new_sign_up_client.deliver_now
      SignUpMailer.with(user: user).new_sign_up_andre.deliver_now
      render json: {}
    else
      render json: { errors: user.errors }, status: :bad_request
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email_address, :password,
                                 :password_confirmation)
  end
end
