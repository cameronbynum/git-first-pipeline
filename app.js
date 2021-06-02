const express = require('express');
const app = express();
const http = require('http');
const fs = require('fs');
const port = process.env.port || 8080
app.use(express.static(__dirname+'/public'));

// app.get('/', (req, res) => {
//   res.send("Refresh page for new number: " + ran_num.between(0,1000))
// })

app.get('/index', (req, res) => {
  fs.readFile('./public/html/index.html', function(error, content) {
    if (error) {
        res.writeHead(500);
        res.end();
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    }
  });
})

app.get('/', (req, res) => {
  fs.readFile('./public/html/index.html', function(error, content) {
    if (error) {
        res.writeHead(500);
        res.end();
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    }
  });
})

app.get('/about-me', (req, res) => {
  fs.readFile('./public/html/about-me.html', function(error, content) {
    if (error) {
        res.writeHead(500);
        res.end();
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    }
  });
})

app.get('/pathing-visualizer', (req, res) => {
  fs.readFile('./public/html/pathing-visualizer.html', function(error, content) {
    if (error) {
        res.writeHead(500);
        res.end();
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    }
  });
})

app.get('/sorting-visualizer', (req, res) => {
  fs.readFile('./public/html/sorting-visualizer.html', function(error, content) {
    if (error) {
        res.writeHead(500);
        res.end();
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    }
  });
})

app.get('/suggest-project', (req, res) => {
  fs.readFile('./public/html/suggest-project.html', function(error, content) {
    if (error) {
        res.writeHead(500);
        res.end();
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    }
  });
})

app.get('/this-website', (req, res) => {
  fs.readFile('./public/html/this-website.html', function(error, content) {
    if (error) {
        res.writeHead(500);
        res.end();
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
    }
  });
})

app.listen(port, () =>{
  console.log("new node js works")
})

