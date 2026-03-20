module Mutations
    class DeleteComment < Mutations::BaseMutation
        argument :id, ID, required: true
        
        field :message, String, null: true

        def resolve(id:)
            comment = Comment.find_by(id:id)
            return { message: "Comment not found" } unless comment

            comment.destroy
            { message: "Comment deleted successfully" }
        end
    end
end