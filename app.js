var http = require('http');
const port = process.env.port || 8080

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Connected to git');
}).listen(port, () => console.log('Listening on Port: ' + port));
