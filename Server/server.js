const express = require ('express')
const mongoose = require ('mongoose')
const cors = require('cors')


const app = require ('express')

mongoose.connect('mongodb://localhost:27017/BlogStar')
.then(()=> console.log('MongoDB is Connected!!!'))
.catch(err => console.log(err))


app.use(cors());
app.use(express.json())





