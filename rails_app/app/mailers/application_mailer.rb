class ApplicationMailer < ActionMailer::Base
  default from: ENV['ANDRE_GMAIL_USERNAME']
  layout 'mailer'
end
