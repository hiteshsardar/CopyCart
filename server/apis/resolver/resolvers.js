const bcrypt = require('bcryptjs');


const User = require('../../models/UserSchema');
const Product = require('../../models/ProductSchema');
const Order=require('../../models/OrderSchema');

module.exports = {
          createOrder: async args => {
            const productquery = await Product.findOne({ _id: args.orderInput.product_id });
            const userquery = await User.findOne({ _id: args.orderInput.user_id });          
            const order = new Order({
              user_id: userquery,
              product_id: productquery,
              status:args.orderInput.status,
              orderAt:new Date(args.orderInput.order_at)
            });
            const result = await order.save();
            return {
               ...result._doc, _id: result._doc._id.toString(),order_at:result._doc.orderAt.toString() 
            };
          },

        orderall: () => {
          return Order.find().populate('user_id').populate('product_id')
            .then(events => {
              return events.map(event => {
                return { ...event._doc,
                  order_at:event.orderAt.toString(),
                  product_id:event.product_id};
              });
            })
            .catch(err => {
              throw err;
            });
        },

        orderbyID: ({id}) => {
          return Order.find({"_id":id}).populate('user_id').populate('product_id')
            .then(events => {
              return events.map(event => {
                return { ...event._doc, _id: event.id,order_at:event.orderAt.toString()};
              });
            })
            .catch(err => {
              throw err;
            });
        },
        

        createProduct: args => {
          const event = new Product({
            producttype:args.productInput.producttype,
            brand:args.productInput.brand,
            color:args.productInput.color,
            size:args.productInput.size,
            description:args.productInput.description,
            availability:args.productInput.availability,
            price:args.productInput.price,
            quantity:args.productInput.quantity
          });
          return event
            .save()
            .then(result => {
              console.log(result);
              return { ...result._doc, _id: result._doc._id.toString() };
            })
            .catch(err => {
              console.log(err);
              throw err;
            });
        },

        productall: () => {
          return Product.find()
            .then(events => {
              return events.map(event => {
                return { ...event._doc, _id: event.id };
              });
            })
            .catch(err => {
              throw err;
            });
        },
        productbyID: ({id}) => {
          return Product.find({"_id":id})
            .then(events => {
              return events.map(event => {
                return { ...event._doc, _id: event.id };
              });
            })
            .catch(err => {
              throw err;
            });
        },



         userall: () => {
           return User.find()
             .then(events => {
               return events.map(event => {
                 return { ...event._doc};
               });
             })
             .catch(err => {
               throw err;
             });
         },
         
         userallorder:({id}) =>{
           return Order.find({"user_id":id})
           .then(events => {
            return events.map(event => {
              return { ...event._doc};
            });
          })
          .catch(err => {
            throw err;
          });
         },

         userbyID: ({id}) => {
          return User.find({"_id":id})
            .then(events => {
              return events.map(event => {
                return { ...event._doc};
              });
            })
            .catch(err => {
              throw err;
            });
        },
        userbyEmail: ({email}) => {
          return User.find({"email":email})
            .then(events => {
              return events.map(event => {
                return { ...event._doc};
              });
            })
            .catch(err => {
              throw err;
            });
        },
        
        ordersbyUser:({user_id}) =>{
          return Order.find({"user_id":user_id})
            .then(events => {
              return events.map(event => {
                return { ...event._doc};
              });
            })
            .catch(err => {
              throw err;
            });
        },


        createUser: args => {
          return User.findOne({ email: args.userInput.email })
            .then(user => {
              if (user) {
                throw new Error('User exists already.');
              }
              return bcrypt.hash(args.userInput.password, 12);
            })
            .then(hashedPassword => {
              const user = new User({
                email: args.userInput.email,
                password: hashedPassword,
                name: args.userInput.name,
                address: args.userInput.address,
                usertype:args.userInput.usertype
              });
              return user.save();
            })
            .then(result => {
              return { ...result._doc, password: null, _id: result.id };
            })
            .catch(err => {
              throw err;
            });
        }
      
};