require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const passport = require('./config/passport.config')
const { ApolloServer } = require('apollo-server-express');
const session = require('express-session')
const authRoutes = require('./routes/index')


//Type defs import
const typeDefs = require('./typeDefs/index')
const resolvers = require('./resolvers/index')

mongoose.set('useCreateIndex', true);
mongoose
    .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch((err) => console.error('Error connecting to mongo', err));



const app = express();

//Initializing things
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());


//Routes
app.use('/auth', authRoutes)


//Apollo server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ req, res })
})

//Apollo middleware server
server.applyMiddleware({ app });

app.listen({ port: process.env.PORT }, () =>
    console.log('🧬 Up and running  http://localhost:' + process.env.PORT + server.graphqlPath + ' 🎉')
);

module.exports = app;

