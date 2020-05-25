class CreateStartupRequests < ActiveRecord::Migration[6.0]
  def change
    create_table :startup_requests do |t|
      t.boolean :complete
      t.integer :user_id

      t.timestamps
    end
  end
end
