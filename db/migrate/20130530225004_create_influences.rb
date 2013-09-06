class CreateInfluences < ActiveRecord::Migration
  def change
    create_table :influences do |t|
      t.integer :width,  :null => false
      t.integer :height, :null => false
      
      t.references :project, :null => false
      t.timestamps
    end
  end
end
