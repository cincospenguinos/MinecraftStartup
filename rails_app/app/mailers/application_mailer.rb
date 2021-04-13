class ApplicationMailer < ActionMailer::Base
  default from: ENV['ANDRE_GMAIL_USERNAME'] || 'foo@bar.biz'
  layout 'mailer'
end
