class CreateUsertypes < ActiveRecord::Migration
  def change
    create_table :usertypes do |t|

      t.timestamps
    end
  end
end
