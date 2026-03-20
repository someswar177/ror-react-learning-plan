require 'rails_helper'

RSpec.describe "GraphQL API", type: :request do
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

  describe "Mutation: createPost" do
    it "creates a post" do
      user = User.create(name: "Test", email: "test@mail.com")

      # post "/graphql", params: {
      #   query: <<~GQL
      #     mutation {
      #       createPost(input: {title: "Hello", body: "World", userId: #{user.id}}) {
      #         post {
      #           title
      #         }
      #         errors
      #       }
      #     }
      #   GQL
      # }

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


end