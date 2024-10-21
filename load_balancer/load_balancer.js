const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const dotenv = require('dotenv');

const app = express();


//setting up environment variables
dotenv.config({path:'.env'})

// List of external servers to balance traffic
const serverCount = parseInt(process.env.SERVER_COUNT, 10);


const servers = [];

for (let i = 1; i <= serverCount; i++) {
  const server = process.env[`SERVER${i}`];
  if (server) {
    servers.push(server);
  }
}

let currentIndex = 0;

// Middleware to handle load balancing
app.use((req, res, next) => {
  // Pick the server using round-robin
  const targetServer = servers[currentIndex];

  // Forward the request to the selected server
  const proxy = createProxyMiddleware({
    target: targetServer,
    changeOrigin: true, // Needed for proxying external domains
    pathRewrite: { '^/': '/' }, // Keep the original path
    onProxyRes: (proxyRes, req, res) => {
      console.log(`Request proxied to: ${targetServer}${req.url}`);
    },
    onError: (err, req, res) => {
      console.error(`Error proxying to: ${targetServer} - ${err.message}`);
      res.status(502).send('Bad Gateway');
    },
  });

  proxy(req, res, next);

  // Update the index to implement round-robin
  currentIndex = (currentIndex + 1) % servers.length;
});

const port = process.env.PORT

// Start the load balancer on port 3000
app.listen(port, () => {
  console.log(`Load balancer is running on port ${port}`);
});
