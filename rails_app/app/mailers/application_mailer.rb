class ApplicationMailer < ActionMailer::Base
  default from: 'thisisanemail@email.yes'
  layout 'mailer'
end
