const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql').graphqlHTTP;
const {mongoUrl} = require('./db_con');
const mongoose = require('mongoose');
const PORT = 4000;

const app = express();


const graphQlSchema = require('./apis/schema/graphqlSchema');
const graphQlResolvers = require('./apis/resolver/graphqlResolver');

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
)

const requireToken = require('./Token_Authuntication/requireToken');
const authRoutes = require('./routes/authRoutes')
app.use(bodyParser.json())
app.use(authRoutes)


app.get('/', requireToken, (req, res) => {
  res.send({ email : req.user.email });
})

// PORT CONNECTION
try {

  app.listen(PORT, () => {
    console.log("server started,on port no "+PORT);
  });

} catch (err) {

  console.log("Error : ", err);

}


// DB CONNECTION
try {

  mongoose.connect(mongoUrl, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  mongoose.connection.on('connected', () => {
    console.log("Conected To MongoDB");
  })

} catch (err) {

  console.log("Error : ", err);

}



