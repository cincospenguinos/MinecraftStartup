# frozen_string_literal: true

namespace :manage_users do
  def accept_user?
    response = STDIN.gets.chomp

    until response.match(/\A[yN]\z/)
      puts "Invalid response\"#{response.strip}\"; need [yN]"
      response = STDIN.gets.chomp
    end

    response.downcase == 'y'
  end

  desc 'dialog for accepting users on the server'
  task accept_dialog: :environment do
    User.where(accepted: false).each do |user|
      puts "#{user.name} would like access to the server"
      print "Email:\t#{user.email_address}\n[yN]"

      if accept_user?
        puts "Accepting #{user.name}"
        user.accept!
        SignUpMailer.with(user: user).notify_accepted.deliver_now
      else
        user.destroy!
        SignUpMailer.with(user: user).notify_rejected.deliver_now
      end
    end
  end
end
