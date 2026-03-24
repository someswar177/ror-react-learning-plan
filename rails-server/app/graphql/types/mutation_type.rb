# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :remove_from_cart, mutation: Mutations::RemoveFromCart
    field :update_cart_item_quantity, mutation: Mutations::UpdateCartItemQuantity
    field :add_to_cart, mutation: Mutations::AddToCart
    field :empty_cart, mutation: Mutations::EmptyCart
    field :create_cart, mutation: Mutations::CreateCart
    field :delete_product, mutation: Mutations::DeleteProduct
    field :update_product, mutation: Mutations::UpdateProduct
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
