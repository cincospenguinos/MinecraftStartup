class SignUpMailer < ApplicationMailer
  def new_sign_up_client
    @name = params[:user].name
    subject = subject_line('Request received!')
    mail(to: params[:user].email_address, subject: subject)
  end

  def new_sign_up_andre
    @name = params[:user].name
    @email_address = params[:user].email_address
    andre = ENV['ANDRE_GMAIL_USERNAME'] || 'definitelymyemail@email.yes'
    subject = subject_line("#{@name} wants access")

    mail(to: andre, subject: subject)
  end

  def notify_accepted
    @name = params[:user].name
    subject = subject_line('You are accepted!')

    mail(to: params[:user].email_address, subject: subject)
  end

  def notify_rejected
    @name = params[:user].name
    email_address = params[:user].email_address
    subject = subject_line('Regrets to inform you')

    mail(to: email_address, subject: subject)
  end

  private

  def subject_line(subject)
    "[Andre's Server] #{subject}"
  end
end
