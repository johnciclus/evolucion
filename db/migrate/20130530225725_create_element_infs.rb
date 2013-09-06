class CreateElementInfs < ActiveRecord::Migration
  def change
    create_table :element_infs do |t|
      t.string :name,       :null => false            
      t.string :type_el,    :null => false
      t.string :title,      :null => false
      t.string :description
      t.string :units
      t.integer :pos_x,     :null => false
      t.integer :pos_y,     :null => false
      
      t.references :influence, :null => false
      t.timestamps
    end
  end
end
