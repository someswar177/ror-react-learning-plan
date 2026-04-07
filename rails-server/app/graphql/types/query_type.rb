# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    field :users, [Types::UserType],null: false
    def users
      User.all
    end

    field :user, Types::UserType,null: true do
      argument :id, ID, required: true
    end
    def user(id:)
      User.find_by(id:id)
    end

    field :user_by_email, Types::UserType, null: true do
      argument :email, String, required: true
    end
    def user_by_email(email:)
      puts email
      User.find_by(email: email)
    end

    field :products, [Types::ProductType], null: false do
      argument :search, String, required: false
      argument :max_price, Float, required: false
    end
    def products(search: nil, max_price: nil)
      # If any search/filter params are provided, use Elasticsearch
      if search.present? || max_price.present?
        response = Product.search_with_filters(query: search, max_price: max_price)
        response.records.to_a
      else
        # No filters → just return all products from Postgres (cheaper)
        Product.all
      end
    end

    field :product, Types::ProductType,null: true do
      argument :id, ID, required: true
    end
    def product(id:)
      Product.find_by(id:id)
    end

    field :cart, Types::CartType, null: true do
      argument :user_id, ID, required: true
    end
    def cart(user_id:)
      Cart.find_by(user_id: user_id)
    end

    field :node, Types::NodeType, null: true, description: "Fetches an object given its ID." do
      argument :id, ID, required: true, description: "ID of the object."
    end

    def node(id:)
      context.schema.object_from_id(id, context)
    end

    field :nodes, [Types::NodeType, null: true], null: true, description: "Fetches a list of objects given a list of IDs." do
      argument :ids, [ID], required: true, description: "IDs of the objects."
    end

    def nodes(ids:)
      ids.map { |id| context.schema.object_from_id(id, context) }
    end

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World!"
    end
  end
end
