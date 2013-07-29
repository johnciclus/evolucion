class CreateRelationSafs < ActiveRecord::Migration
  def change
    create_table :relation_safs do |t|

      t.timestamps
    end
  end
end
