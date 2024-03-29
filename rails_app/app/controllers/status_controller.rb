# frozen_string_literal: true

require 'spigot/spigot_interface'

class StatusController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:status]

  def status
    render json: { status: reported_status }
  end

  private

  def reported_status
    spigot_status = spigot_interface.status
    return :online if spigot_status == :online
    return :pending if StartupRequest.pending? && spigot_status == :offline

    :offline
  end

  def spigot_interface
    @spigot_interface ||= ::Spigot::SpigotInterface.new(ENV['MINECRAFT_STATUS_PORT'])
  end
end
