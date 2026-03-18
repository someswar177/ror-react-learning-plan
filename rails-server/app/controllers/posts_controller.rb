class PostsController < ApplicationController
    before_action :set_post, only: [:show, :update, :destroy]

    def index
        @posts = Post.all
        render json: @posts, status: :ok
    end

    def show
        render json: @post, status: :ok
    end

    def create
        @post = Post.new(post_params)
        if @post.save
            render json: @post, status: :created, notice: "Post created successfully"
        else
            render @post.errors, status: :unprocessable_entity
        end
    end

    def update
        if @post.update(post_params)
            render json: @post, notice: "Post updated successfully"
        else
            render @post.errors, status: :unprocessable_entity
        end
    end

    def destroy
        @post.destroy!
        render head: :no_body, notice: "Post deleted successfully"
    end

    private
        def set_post
            @post = Post.find(params[:id])
        end

        def post_params
            params.expect(post: [:title, :body])
        end
end
