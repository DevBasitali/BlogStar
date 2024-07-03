const express = require ('express')
const mongoose = require ('mongoose')
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/BlogStar')
.then(()=> console.log('MongoDB is Connected!!!'))
.catch(err => console.log(err))

// app.use ('/api/auth', authRoutes)
// app.use ('/api/auth', blogRoutes)

const PORT = process.env.PORT || 5000;

 app.listen(PORT,()=> console.log(`Port is listening on  ${PORT}`));





