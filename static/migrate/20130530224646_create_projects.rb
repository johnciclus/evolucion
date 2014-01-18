class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :title,        :null => false
      t.string :description,  :null => false
      t.string :author,       :null => false
      t.string :keywords,     :null => false
      t.text   :model,        :null => false
      
      t.timestamps
    end
  end
end
