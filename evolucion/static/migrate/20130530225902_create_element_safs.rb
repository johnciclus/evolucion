class CreateElementSafs < ActiveRecord::Migration
  def change
    create_table :element_safs do |t|

      t.timestamps
    end
  end
end
