class CreateEquations < ActiveRecord::Migration
  def change
    create_table :equations do |t|

      t.timestamps
    end
  end
end
