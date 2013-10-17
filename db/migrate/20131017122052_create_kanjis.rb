class CreateKanjis < ActiveRecord::Migration
  def change
    create_table :kanjis do |t|
      t.string :imageUrl
      t.string :symbolName

      t.timestamps
    end
  end
end
