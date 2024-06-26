require('dotenv').config(); // import the config file 

const express = require('express');//imports the express framework
const mongoose = require('mongoose');
const cors = require('cors');

//importing routers
const userRouter = require('./routes/userRoutes')
const itemRouter = require('./routes/itemRoutes')
const collectionRouter = require('./routes/collectionRoutes')


const app = express();//create express app


// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD','DELETE'],
  credentials: true
}));

// middleware
app.use(express.json()) // instead of using body parser 

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/auth',userRouter)
app.use('/api/item',itemRouter)
app.use('/api/collection',collectionRouter)


mongoose.connect(process.env.MONGO_URI)
.then( () => {
  console.log("connected to db");
  // listen for requests
  app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
  })
 }
)
.catch(
  (err) => console.log(err)
);