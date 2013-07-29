class CreateProses < ActiveRecord::Migration
  def change
    create_table :proses do |t|

      t.timestamps
    end
  end
end
