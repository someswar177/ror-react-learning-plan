# frozen_string_literal: true

module Mutations
  class EmptyCart < BaseMutation
    argument :cart_id, ID, required: true

    field :message, String, null: false
    field :errors, [String], null: false

    def resolve(cart_id:)
      cart = Cart.find_by(id:cart_id)
      if cart&.cart_items&.destroy_all
        { message: "Cart Cleared", errors: [] }
      else
        { message: "Error", errors: ["Cart not found"] }
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
