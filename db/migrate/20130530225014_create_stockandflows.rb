class CreateStockandflows < ActiveRecord::Migration
  def change
    create_table :stockandflows do |t|

      t.timestamps
    end
  end
end
