module Types
    class PostType < Types::BaseObject
        field :id, ID, null: false
        field :title, String
        field :body, String
        field :user, Types::UserType
        field :comments, [Types::CommentType], null: true
    end
end