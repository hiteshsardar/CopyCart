const { buildSchema } = require('graphql');

module.exports = buildSchema(`

          input Name{ 
            firstname:String,
            middlename:String,
            lastname:String
          },

          input Address{
            area:String,
            state:String,
            country:String,
            code:Int,
          },
          type Address1{
            area:String,
            state:String,
            country:String,
            code:Int,
          },

          type Addressone{
            area:String,
            state:String,
            country:String,
            code:Int,
          },
          type Nameone{ 
            firstname:String,
            middlename:String,
            lastname:String
          },


          type User {
            _id:ID!
            email: String,
            password:String,
            name:Nameone,
            address:Addressone,
            usertype:String,
            currentorders:OrderDetails,
          },
          type UserallOrder{
            _id:ID!,
            orders:OrderDetails,
          }

          input UserInput {
            email: String!,
            password: String!,
            name: Name!,
            address:Address!,
            usertype: String!,
          },


          input ProductInput{
            producttype:String!,
            brand:String!,
            color:String!,
            size:String!
            description:String!
            availability:Boolean!,
            quantity:Int!,
            price:Int!,
          }

          type ProductOne{
            _id:ID!,
            producttype:String,
            brand:String,
            color:String,
            size:String
            description:String
            availability:Boolean,
            price:Int,
            quantity:Int,
          }

          input OrderInput {
            user_id:ID!,
            product_id:ID!,
            status:String!,
            order_at:String!
          }

          type OrderDetails{
            _id:ID!
            user_id:User!,
            product_id:ProductOne,
            status:String!,
            order_at:String,

          }

          type Queries {
              productall:[ProductOne!]!
              orderall:[OrderDetails!]
              productbyID(id:ID!):[ProductOne!]!
              orderbyID(id:ID!):[OrderDetails!]
              userall:[User!]!
              userbyID(id:ID!):[User!]!
              userbyEmail(email:String!):[User!]!
              ordersbbyUser(user_id:String!):[OrderDetails!]!
              userallorder(id:ID!):[UserallOrder]
          },
          type Mutations {
              createUser(userInput: UserInput): User
              createProduct(productInput:ProductInput):ProductOne
              createOrder(orderInput:OrderInput):OrderDetails
          },


          schema {
              query: Queries
              mutation: Mutations
              
          }
`);