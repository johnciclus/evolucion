class CreateBehaviors < ActiveRecord::Migration
  def change
    create_table :behaviors do |t|

      t.timestamps
    end
  end
end
