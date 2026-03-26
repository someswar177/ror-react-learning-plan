# frozen_string_literal: true

module Mutations
  class CreateProduct < BaseMutation
    argument :name,String,required: true
    argument :price,Float,required: true
    argument :description,String,required: false

    field :product, Types::ProductType, null: true
    field :error, [String], null: false

    def resolve(name:,price:,description:)
      product = Product.new(name:name,price:price,description:description)

      if product.save
        { product:product, error:[] }
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
