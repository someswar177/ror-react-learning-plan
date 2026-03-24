# frozen_string_literal: true

module Mutations
  class DeleteProduct < BaseMutation
    argument :id, ID, required: true

    field :message, String, null: false
    field :errors, [String], null: false

    def resolve(id:)
      product = Product.find(id)
      if product.destroy
        { message: "Product deleted successfully", errors: [] }
      else
        { message: "Deletion failed", errors: product.errors.full_messages }
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
