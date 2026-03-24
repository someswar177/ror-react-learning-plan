# frozen_string_literal: true

module Mutations
  class UpdateProduct < BaseMutation
    argument :id, ID, required: true
    argument :name, String, required: false
    argument :price, Integer, required: false
    argument :description, String, required: false

    field :product, Types::ProductType, null: true
    field :errors, [String], null: false

    def resolve(id:, **args)
      product = Product.find(id)
      if product.update(args)
        { product: product, errors: [] }
      else
        { product: nil, errors: product.errors.full_messages }
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
