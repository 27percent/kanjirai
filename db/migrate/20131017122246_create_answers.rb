class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.string :imageUrl
      t.integer :kanjiId

      t.timestamps
    end
  end
end
