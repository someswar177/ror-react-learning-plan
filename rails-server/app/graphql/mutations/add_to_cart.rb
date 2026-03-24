# frozen_string_literal: true

module Mutations
  class AddToCart < BaseMutation
    argument :cartId, ID, required: true
    argument :productId, ID, required: true
    argument :quantity, Integer, required: true

    field :cartItem, Types::CartItemType, null: true
    field :errors, [String], null: false

    def resolve(cartId:,productId:,quantity:)
      cartItem = CartItem.new(cart_id:cartId,product_id:productId,quantity:quantity)
      if cartItem.save
        { cartItem: cartItem, errors: []}
      else
        { cartItem:nil, errors: cartItem.errors.full_messages }
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
