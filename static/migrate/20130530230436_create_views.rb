class CreateViews < ActiveRecord::Migration
  def change
    create_table :views do |t|

      t.timestamps
    end
  end
end
