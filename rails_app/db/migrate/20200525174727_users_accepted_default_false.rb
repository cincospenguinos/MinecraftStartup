class UsersAcceptedDefaultFalse < ActiveRecord::Migration[6.0]
  def change
    change_column :users, :accepted, :boolean, default: false
  end
end
