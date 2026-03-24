# frozen_string_literal: true

module Mutations
  class UpdateUser < BaseMutation
    argument :id, ID, required: true
    argument :name, String, required: false
    argument :email, String, required: false

    field :user, Types::UserType, null: true
    field :errors, [String], null: false

    def resolve(id:, **args)
      user = User.find(id)
      if user.update(args)
        { user: user, errors: [] }
      else
        { user: nil, errors: user.errors.full_messages }
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
