module Types
    class CommentType < Types::BaseObject
        field :id, ID, null: false
        field :body, String
        field :user, Types::UserType
        field :post, Types::PostType
    end
end