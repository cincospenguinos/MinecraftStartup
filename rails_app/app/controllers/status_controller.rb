# frozen_string_literal: true

require 'spigot/spigot_interface'

class StatusController < ApplicationController
  def status
    status = spigot_interface.status
    render json: { status: status }
  end

  private

  def spigot_interface
    @spigot_interface ||= ::Spigot::SpigotInterface.new(25_565) # TODO: Configure port
  end
end
