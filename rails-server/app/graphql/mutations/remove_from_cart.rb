# frozen_string_literal: true

module Mutations
  class RemoveFromCart < BaseMutation
    argument :cartItemId,ID,required: true

    field :message,String,null: true
    field :errors,[String],null: false

    def resolve(cartItemId:)
      cartItem = CartItem.find_by(id:cartItemId)
      if cartItem.destroy
        { message: "Item removed from cart!", errors:[] }
      else
        { message: "Not deleted", errors:cartItem.errors.full_messages }
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
