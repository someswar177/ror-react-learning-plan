require 'rails_helper'
RSpec.describe "GraphQL API", type: :request do
  describe "Query: users" do
        it "returns users" do
          User.create(name:"somu", email:"somu@example.com")
          post "/graphql", params:{
            query:"{
              users{
                name
              }
            }"
          }
          json = JSON.parse(response.body)

          puts json

          expect(json["data"]["users"].length).to eq(1)
        end
  end  
end