module Mutations
    class CreateComment < Mutations::BaseMutation
        argument :body, String, required: true
        argument :user_id, ID, required: true 
        argument :post_id, ID, required: true
        
        field :comment, Types::CommentType, null: true
        field :errors, [String], null: false

        def resolve(body:, user_id:, post_id:)
            comment = Comment.new(body: body, user_id: user_id, post_id: post_id)

            if comment.save
                { comment: comment, errors: [] }
            else
                { comment: nil, errors: comment.errors.full_messages }
            end
        end
    end
end
