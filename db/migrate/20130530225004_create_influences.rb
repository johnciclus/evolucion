class CreateInfluences < ActiveRecord::Migration
  def change
    create_table :influences do |t|

      t.timestamps
    end
  end
end
