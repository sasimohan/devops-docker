'use strict';

const http = require('http');

const handlers = require('./handlers');

const server = http.createServer(async (req, res) => {

  try {
    if (req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      const data = await handlers.show_api_info()
      res.end(JSON.stringify({ data }));
    }
    else if (req.url === '/users') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      const data = await handlers.list_users()
      res.end(JSON.stringify({ data }));
    }
    else if (req.url.match(/users\/.+/)) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      const username = req.url.split('/')[2];
      console.log(username)
      const data = await handlers.get_user_with_tweets(username)
      res.end(JSON.stringify({ data }));
    }
    else { // 404
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        data: 'Not Found',
      }));
    }
  } catch (error) { // 500
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      data: 'Internal Server Error',
    }));
  }
});

server.listen('3000');

console.log('Node.js web server at port 3000 is running...')
