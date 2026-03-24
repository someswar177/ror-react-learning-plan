# frozen_string_literal: true

module Mutations
  class DeleteUser < BaseMutation
    argument :id, ID, required: true

    field :message, String, null: false
    field :errors, [String], null: false

    def resolve(id:)
      user = User.find(id)
      if user.destroy
        { message: "User deleted successfully", errors: [] }
      else
        { message: "Deletion failed", errors: user.errors.full_messages }
      end
    end
    # TODO: define return fields
    # field :post, Types::PostType, null: false

    # TODO: define arguments
    # argument :name, String, required: true

    # TODO: define resolve method
    # def resolve(name:)
    #   { post: ... }
    # end
  end
end
