


const express = require('express');
const app = express();

const port = process.env.port || 8080

app.get('/', (req, res) => {
  res.send("Welcome to the homepage")
})

app.listen(port, () =>{
  console.log("new node js works")
})