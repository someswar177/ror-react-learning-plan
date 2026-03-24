module Mutations
    class UpdatePost < Mutations::BaseMutation
        argument :id, ID, required: true
        argument :title, String, required: true
        argument :body, String, required: true

        field :post, Types::PostType, null: true
        field :errors, [String], null: false

        def resolve(id:, **attrs)
            post = Post.find_by(id: id)
            return { post: nil, errors: ["Post not found"] } unless post

            if post.update(attrs)
                { post: post, errors: []}
            else
                { post: nil, errors: post.errors.full_messages }
            end
        end
    end
end