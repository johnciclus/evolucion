class CreateRelationInfs < ActiveRecord::Migration
  def change
    create_table :relation_infs do |t|                 
      t.string  :type_rel,      :null => false
      t.string  :description
      t.float   :po_x,          :null => false
      t.float   :po_y,          :null => false
      t.float   :pco_x,         :null => false
      t.float   :pco_y,         :null => false
      t.float   :pd_x,          :null => false
      t.float   :pd_y,          :null => false
      t.float   :pcd_x,         :null => false
      t.float   :pcd_y,         :null => false
      
      t.references :origin,     :null => false
      t.references :destination,:null => false
      t.references :influence,  :null => false
      t.timestamps
    end
  end
end
