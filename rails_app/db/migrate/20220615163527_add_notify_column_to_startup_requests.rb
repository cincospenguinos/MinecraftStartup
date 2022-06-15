class AddNotifyColumnToStartupRequests < ActiveRecord::Migration[6.0]
  def change
    add_column :startup_requests, :notify, :boolean, default: false
  end
end
