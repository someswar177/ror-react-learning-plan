# frozen_string_literal: true

module Mutations
  class CreateCart < BaseMutation
    argument :user_id, ID, required: true

    field :cart, Types::CartType, null: true
    field :errors, [String], null: false

    def resolve(user_id:)
      cart = Cart.new(user_id:user_id)
      if cart.save
        { cart:cart, errors: [] }
      else
        { cart:nil, errors: cart.errors.full_messages }
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
