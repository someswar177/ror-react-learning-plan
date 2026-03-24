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

    it "updates user" do
      user = User.create(name: "Old Name", email: "old@example.com")
      post "/graphql", params: {
        query: <<~GQL,
          mutation($id: ID!, $name: String!) {
            updateUser(input: { id: $id, name: $name }) {
              user { name }
            }
          }
        GQL
        variables: { id: user.id, name: "New Name" }
      }, as: :json

      json = JSON.parse(response.body)
      expect(json["data"]["updateUser"]["user"]["name"]).to eq("New Name")
    end

    it "deletes user" do
      user = User.create(name: "Delete Me", email: "gone@example.com")
      post "/graphql", params: {
        query: <<~GQL,
          mutation($id: ID!) {
            deleteUser(input: { id: $id }) {
              message
            }
          }
        GQL
        variables: { id: user.id }
      }, as: :json

      json = JSON.parse(response.body)
      expect(json["data"]["deleteUser"]["message"]).to eq("User deleted successfully")
      expect(User.exists?(user.id)).to be false
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
    it "updates product" do
      product = Product.create(name: "Old Chair", price: 1000)
      post "/graphql", params: {
        query: <<~GQL,
          mutation($id: ID!, $price: Int!) {
            updateProduct(input: { id: $id, price: $price }) {
              product { price }
            }
          }
        GQL
        variables: { id: product.id, price: 5000 }
      }, as: :json

      json = JSON.parse(response.body)
      expect(json["data"]["updateProduct"]["product"]["price"]).to eq(5000)
    end

    it "deletes product" do
      product = Product.create(name: "Broken Chair", price: 0)
      post "/graphql", params: {
        query: <<~GQL,
          mutation($id: ID!) {
            deleteProduct(input: { id: $id }) {
              message
            }
          }
        GQL
        variables: { id: product.id }
      }, as: :json

      json = JSON.parse(response.body)
      expect(json["data"]["deleteProduct"]["message"]).to eq("Product deleted successfully")
      expect(Product.exists?(product.id)).to be false
    end
  end

  describe "Mutations: Cart" do
    it "creates cart" do
      user = User.create(name:"somu",email:"somu@example.com")
      post "/graphql", params:{
        query:<<~GQL,
          mutation($userId: ID!){
            createCart(input:{userId: $userId}){
              cart{
                userId                
              }              
            }
          }
        GQL
        variables: { userId: user.id }
      }

      json = JSON.parse(response.body)

      expect(json["errors"]).to be_nil
      expect(json["data"]["createCart"]["cart"]["userId"]).to eq(user.id)
    end

    it "empty cart" do
      user = User.create(name:"somu", email:"somu@example.com")
      cart = Cart.create(user_id:user.id)
      product = Product.create(name:"Chair",price:3000,description:"Office Chair")
      cartItem = CartItem.create(product_id:product.id,cart_id:cart.id,quantity:1)

      post "/graphql", params:{
        query:<<~GQL,
          mutation($cartId:ID!){
            emptyCart(input: {cartId: $cartId}){
              message
            }
          }                  
        GQL
        variables: {cartId: cart.id}
      }

      json = JSON.parse(response.body)

      expect(json["data"]["emptyCart"]["message"]).to eq("Cart Cleared")
    end

    it "adds an item to the cart" do
      user = User.create(name:"somu", email:"somu@example.com")
      cart = Cart.create(user_id:user.id)
      product = Product.create(name:"Chair",price:3000,description:"Office Chair")

      post "/graphql", params:{
        query:<<~GQL,
          mutation($cartId:ID!,$productId:ID!,$quantity:Int!){
            addToCart(input:{ cartId: $cartId, productId: $productId, quantity: $quantity }){
              cartItem{
                quantity
                product{
                  name
                }
                cart{
                  user{
                    name
                  }
                }
              }
            }
          }
        GQL
        variables: {
          cartId: cart.id,
          productId: product.id,
          quantity: 1
        }
      }, as: :json

      json = JSON.parse(response.body)

      expect(json["data"]["addToCart"]["cartItem"]["cart"]["user"]["name"]).to eq("somu")            
    end

    it "updates cart item quantity" do
      user = User.create(name:"somu", email:"somu@example.com")
      cart = Cart.create(user_id:user.id)
      product = Product.create(name:"Chair",price:3000,description:"Office Chair")
      cartItem = CartItem.create(product_id:product.id,cart_id:cart.id,quantity:1)
      
      post "/graphql", params:{
        query:<<~GQL,
          mutation($cartItemId:ID!, $quantity: Int!){
            updateCartItemQuantity(input:{cartItemId:$cartItemId, quantity:$quantity}){
              cartItem{
                quantity
              }
            }
          }
        GQL
        variables:{ cartItemId: cartItem.id, quantity: 4 }
      }, as: :json

      json = JSON.parse(response.body)

      expect(json["data"]["updateCartItemQuantity"]["cartItem"]["quantity"]).to eq(4)
    end

    it "removes cart item from cart" do
      user = User.create(name:"somu", email:"somu@example.com")
      cart = Cart.create(user_id:user.id)
      product = Product.create(name:"Chair",price:3000,description:"Office Chair")
      cartItem = CartItem.create(product_id:product.id,cart_id:cart.id,quantity:1)
      
      post "/graphql", params:{
        query:<<~GQL,
          mutation($cartItemId:ID!){
            removeFromCart(input:{cartItemId:$cartItemId}){
              message
            }
          }
        GQL
        variables:{ cartItemId: cartItem.id }
      }, as: :json

      json = JSON.parse(response.body)

      expect(json["data"]["removeFromCart"]["message"]).to eq("Item removed from cart!")      
    end
  end
end