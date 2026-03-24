# frozen_string_literal: true

module Mutations
  class UpdateCartItemQuantity < BaseMutation
    argument :cartItemId, ID, required: true
    argument :quantity, Integer, required: true

    field :cartItem, Types::CartItemType, null:true
    field :errors, [String], null:false

    def resolve(cartItemId:,quantity:)
      cart_item = CartItem.find_by(id:cartItemId)
      if cart_item.update(quantity: quantity)
        { cartItem: cart_item, errors:[] }
      else
        { cartItem:nil, errors: cart_item.errors.full_messages }
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
