const express = require('express');
const app = express();
const port = process.env.port || 8080
var ran_num = require('./javascript/random_number_generator')


app.get('/', (req, res) => {
  res.send("Refresh page for new number: " + ran_num.between(0,1000))
})

app.listen(port, () =>{
  console.log("new node js works")
})

