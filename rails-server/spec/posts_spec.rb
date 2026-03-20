require 'rails_helper'

RSpec.describe "Posts", type: :request do
    describe "GET /posts" do
        it "returns a list of posts" do
            Post.create!(title: "First Post", body: "This is the first post.")
            Post.create!(title: "Second Post", body: "This is the second post.")

            get "/posts"
            expect(response).to have_http_status(:ok)
            expect(JSON.parse(response.body).size).to eq(2)
        end
    end

    describe "POST /posts" do
        it "creates a new post" do
            post "/posts", params: { post: { title: "New Post", body: "This is a new post." } }
            expect(response).to have_http_status(:created)
        end
    end
end