const express = require ('express')
const mongoose = require ('mongoose')
const cors = require('cors')
const config = require('../Server/config')
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require ('./routes/blogRoutes')


const app = express();

app.use(cors());
app.use(express.json())

mongoose.connect(config.MongoURI)
.then(console.log('MongoDB is Connected!!!')) 
// ()=>
.catch(err => console.log(err))

app.use ('/api/auth', authRoutes)
// app.use ('/api/auth', blogRoutes)
app.use('/api/blog', blogRoutes);

const PORT = process.env.PORT || 5000;

 app.listen(PORT,()=> console.log(`Port is listening on  ${PORT}`));





