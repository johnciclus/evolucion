class CreateRelationInfs < ActiveRecord::Migration
  def change
    create_table :relation_infs do |t|

      t.timestamps
    end
  end
end
