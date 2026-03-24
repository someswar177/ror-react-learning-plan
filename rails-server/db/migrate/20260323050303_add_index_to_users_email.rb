class AddIndexToUsersEmail < ActiveRecord::Migration[8.1]
  disable_ddl_transaction!
  def change
    add_index :users, :email, algorithm: :concurrently
  end

  # This below code means -> telling Rails: "I know this is dangerous. Do it anyway."
  # safety_assured do
  #   add_index :users, :email
  # end
end
