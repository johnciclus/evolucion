class CreateElementInfs < ActiveRecord::Migration
  def change
    create_table :element_infs do |t|

      t.timestamps
    end
  end
end
