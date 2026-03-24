# frozen_string_literal: true

module Mutations
  class CreateUser < BaseMutation
    argument :name,String, required:true
    argument :email,String, required:true

    field :user, Types::UserType, null: true
    field :errors, [String], null: false
    
    def resolve(name:,email:)
      user = User.new(name:name,email:email)
      if user.save
        { user: user, errors:[] }
      else
        { user: nil, errors: user.errors.full_messages }
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
