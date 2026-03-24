require 'rails_helper'
RSpec.describe "GraphQL API", type: :request do
  describe "Query: users" do
        it "returns users" do
          User.create(name:"somu", email:"somu@example.com")
          post "/graphql", params:{
            query:"{
              users{
                name
                email
              }
            }"
          }
          json = JSON.parse(response.body)

          expect(json["data"]["users"].length).to eq(1)
          expect(json["data"]["users"][0]["name"]).to eq("somu")
          expect(json["data"]["users"][0]).to eq({"name"=>"somu","email"=>"somu@example.com"})
        end

        it "returns user" do
          user = User.create(name:"somu",email:"somu@example.com")
          post "/graphql", params:{
            query:"{
              user(id:#{user.id}){
                name
                email
              }
            }"
          }

          json = JSON.parse(response.body)

          expect(json["data"]["user"]["name"]).to eq("somu")
        end
  end

  describe "Mutation: User" do
    it "creates user" do
      post "/graphql", params:{
        query: <<~GQL
          mutation {
            createUser(input:{name:"somu",email:"somu@example.com"}){
            user{
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

    expect(json["data"]["createUser"]["user"]["name"]).to eq("somu")
    end
  end
  
  describe "Query: Products" do
    it "returns products" do
      Product.create(name:"Chair",price:3000,description:"Office Chair")
      post "/graphql", params:{
        query:"{
          products{
            name
            price
            description
          }
        }"
      }

      json = JSON.parse(response.body)

      expect(json["data"]["products"][0]["name"]).to eq("Chair")
      expect(json["data"]["products"].length).to eq(1)
    end

    it "returns product" do
      product = Product.create(name:"Chair",price:3000,description:"Office Chair")
      post "/graphql", params:{
        query:"{
          product(id:#{product.id}){
            name
            price
            description
          }
        }"
      }

      json = JSON.parse(response.body)

      expect(json["data"]["product"]["name"]).to eq("Chair")
    end
  end

  describe "Mutation: Product" do
    it "creates product" do
      post "/graphql", params:{
        query: <<~GQL
          mutation{
            createProduct(input:{name:"chair",price:3000,description:"study chair"}){
            product{
              id
              name
              price
              description
            }
          }
          }
        GQL
      }

      json = JSON.parse(response.body)

      expect(json["data"]["createProduct"]["product"]["name"]).to eq("chair");
    end
  end
end