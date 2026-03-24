require 'rails_helper'

RSpec.describe "GraphQL API", type: :request do

  # QUERIES

  describe "Query: users" do
    it "returns users" do
      User.create(name: "Test", email: "test@mail.com")

      post "/graphql", params: {
        query: "{ users { name email } }"
      }

      json = JSON.parse(response.body)

      expect(response).to have_http_status(:ok)
      expect(json["data"]["users"].length).to eq(1)
    end
  end

  describe "Query: user" do
    it "returns a single user" do
      user = User.create(name: "Test", email: "test@mail.com")

      post "/graphql", params: {
        query: "{ user(id: #{user.id}) { name email } }"
      }

      json = JSON.parse(response.body)

      expect(json["data"]["user"]["name"]).to eq("Test")
    end
  end

  # USER MUTATIONS

  describe "Mutation: createUser" do
    it "creates a user" do
      post "/graphql", params: {
        query: <<~GQL
          mutation {
            createUser(input:{name: "Someswar", email: "test@mail.com"}) {
              user {
                id
                name
                email
              }
              errors
            }
          }
        GQL
      }

      json = JSON.parse(response.body)

      expect(json["data"]["createUser"]["user"]["name"]).to eq("Someswar")
    end
  end

  describe "Mutation: updateUser" do
    it "updates a user" do
      user = User.create(name: "Old", email: "old@mail.com")

      post "/graphql", params: {
        query: <<~GQL
          mutation {
            updateUser(input: {id: #{user.id}, name: "NewName", email: "new@mail.com"}) {
              user {
                id
                name
                email
              }
              errors
            }
          }
        GQL
      }

      json = JSON.parse(response.body)

      expect(json["data"]["updateUser"]["user"]["name"]).to eq("NewName")
      expect(json["data"]["updateUser"]["user"]["email"]).to eq("new@mail.com")
    end
  end

  describe "Mutation: deleteUser" do
    it "deletes a user" do
      user = User.create(name: "Test", email: "test@mail.com")

      post "/graphql", params: {
        query: <<~GQL
          mutation {
            deleteUser(input: {id: #{user.id}}) {
              message
            }
          }
        GQL
      }

      json = JSON.parse(response.body)

      expect(json["data"]["deleteUser"]["message"]).to eq("User deleted successfully")
      expect(User.find_by(id: user.id)).to be_nil
    end
  end

  # POST MUTATIONS

  describe "Mutation: createPost" do
    it "creates a post" do
      user = User.create(name: "Test", email: "test@mail.com")

      post "/graphql", params: {
        query: <<~GQL,
          mutation($userId: ID!) {
            createPost(input: {title: "Hello", body: "World", userId: $userId}) {
              post { title }
            }
          }
        GQL
        variables: { userId: user.id }
      }

      json = JSON.parse(response.body)

      expect(json["data"]["createPost"]["post"]["title"]).to eq("Hello")
    end
  end

  describe "Mutation: updatePost" do
    it "updates a post" do
      user = User.create(name: "Test", email: "test@mail.com")
      post_record = Post.create(title: "Old Title", body: "Old Body", user: user)

      post "/graphql", params: {
        query: <<~GQL
          mutation {
            updatePost(input: {id: #{post_record.id}, title: "New Title", body: "New Body"}) {
              post {
                id
                title
                body
              }
              errors
            }
          }
        GQL
      }

      json = JSON.parse(response.body)

      expect(json["data"]["updatePost"]["post"]["title"]).to eq("New Title")
    end
  end

  describe "Mutation: deletePost" do
    it "deletes a post" do
      user = User.create(name: "Test", email: "test@mail.com")
      post_record = Post.create(title: "Hello", body: "World", user: user)

      post "/graphql", params: {
        query: <<~GQL
          mutation {
            deletePost(input: {id: #{post_record.id}}) {
              message
            }
          }
        GQL
      }

      json = JSON.parse(response.body)

      expect(json["data"]["deletePost"]["message"]).to eq("Post deleted successfully")
      expect(Post.find_by(id: post_record.id)).to be_nil
    end
  end

  # COMMENT MUTATIONS

  describe "Mutation: createComment" do
    it "creates a comment" do
      user = User.create(name: "Test", email: "test@mail.com")
      post_record = Post.create(title: "Hello", body: "World", user: user)

      post "/graphql", params: {
        query: <<~GQL
          mutation {
            createComment(input: {body: "Nice", userId: #{user.id}, postId: #{post_record.id}}) {
              comment {
                body
              }
              errors
            }
          }
        GQL
      }

      json = JSON.parse(response.body)

      expect(json["data"]["createComment"]["comment"]["body"]).to eq("Nice")
    end
  end

  describe "Mutation: updateComment" do
    it "updates a comment" do
      user = User.create(name: "Test", email: "test@mail.com")
      post_record = Post.create(title: "Hello", body: "World", user: user)
      comment = Comment.create(body: "Old Comment", user: user, post: post_record)

      post "/graphql", params: {
        query: <<~GQL
          mutation {
            updateComment(input: {id: #{comment.id}, body: "Updated Comment"}) {
              comment {
                id
                body
              }
              errors
            }
          }
        GQL
      }

      json = JSON.parse(response.body)

      expect(json["data"]["updateComment"]["comment"]["body"]).to eq("Updated Comment")
    end
  end

  describe "Mutation: deleteComment" do
    it "deletes a comment" do
      user = User.create(name: "Test", email: "test@mail.com")
      post_record = Post.create(title: "Hello", body: "World", user: user)
      comment = Comment.create(body: "Nice", user: user, post: post_record)

      post "/graphql", params: {
        query: <<~GQL
          mutation {
            deleteComment(input: {id: #{comment.id}}) {
              message
            }
          }
        GQL
      }

      json = JSON.parse(response.body)

      expect(json["data"]["deleteComment"]["message"]).to eq("Comment deleted successfully")
      expect(Comment.find_by(id: comment.id)).to be_nil
    end
  end

end