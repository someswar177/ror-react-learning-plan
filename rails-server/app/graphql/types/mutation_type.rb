# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :delete_cart_item, mutation: Mutations::DeleteCartItem
    field :delete_cart, mutation: Mutations::DeleteCart
    field :delete_product, mutation: Mutations::DeleteProduct
    field :update_cart_item, mutation: Mutations::UpdateCartItem
    field :update_cart, mutation: Mutations::UpdateCart
    field :update_product, mutation: Mutations::UpdateProduct
    field :create_cart_item, mutation: Mutations::CreateCartItem
    field :create_cart, mutation: Mutations::CreateCart
    field :create_product, mutation: Mutations::CreateProduct
    field :delete_user, mutation: Mutations::DeleteUser
    field :update_user, mutation: Mutations::UpdateUser
    field :create_user, mutation: Mutations::CreateUser
    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World"
    end
  end
end
