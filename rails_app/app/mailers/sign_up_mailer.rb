class SignUpMailer < ApplicationMailer
  def new_sign_up_client
    @name = params[:user].name
    mail(to: params[:user].email_address, subject: "[Andre's Server] Request received!")
  end

  def new_sign_up_andre
    @name = params[:user].name
    @email_address = params[:user].email_address
    andre = ENV['ANDRE_GMAIL_USERNAME'] || 'definitelymyemail@email.yes'

    mail(to: andre, subject: "[Andre's Server] #{@name} wants access")
  end
end
