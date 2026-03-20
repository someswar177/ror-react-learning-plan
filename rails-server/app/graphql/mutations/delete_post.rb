module Mutations
    class DeletePost < Mutations::BaseMutation
        argument :id, ID, required: true

        field :message, String, null:true

        def resolve(id:)
            post = Post.find_by(id:id)
            return { message: "Post not found" } unless post

            post.destroy
            { message: "Post deleted successfully" }
        end
    end
end
