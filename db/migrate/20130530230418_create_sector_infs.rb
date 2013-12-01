class CreateSectorInfs < ActiveRecord::Migration
  def change
    create_table :sector_infs do |t|

      t.timestamps
    end
  end
end
