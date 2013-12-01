class CreateSectorSafs < ActiveRecord::Migration
  def change
    create_table :sector_safs do |t|

      t.timestamps
    end
  end
end
