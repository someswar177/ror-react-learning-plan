module Mutations
    class UpdateComment < Mutations::BaseMutation
        argument :id, ID, required: true
        argument :body,String, required: false

        field :comment, Types::CommentType, null: true
        field :errors, [String], null: false
        
        def resolve(id:, body:)
            comment = Comment.find_by(id:id)
            return { comment: nil, errors: ["Comment not found"] } unless comment

            if comment.update(body: body)
                { comment: comment, errors: [] }
            else
                { comment:nil, errors: comment.errors.full_messages }
            end
        end
    end
end

