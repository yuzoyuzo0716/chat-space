class RenameMassegeMessage < ActiveRecord::Migration[5.0]
  def change
      rename_table :massages, :messages
  end
end
