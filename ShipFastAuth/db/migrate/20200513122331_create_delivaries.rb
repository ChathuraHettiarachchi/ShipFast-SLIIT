class CreateDelivaries < ActiveRecord::Migration[6.0]
  def change
    create_table :delivaries do |t|
      t.references :order, null: false, foreign_key: true
      t.integer :status

      t.timestamps
    end
  end
end
