class CreateProses < ActiveRecord::Migration
  def change
    create_table :proses do |t|
      t.string  :title,       :null => false
      t.text    :description, :null => false
      
      t.references :project, :null => false
      t.timestamps
    end
  end
end
