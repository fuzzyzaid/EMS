const express = require('express');

const path = require('path');

const proxy = require('http-proxy-middleware');

const app = express();

app.use(express.static('public'));

require('dotenv').config();

const port = process.env.UI_PORT || 3000;
const apiProxyTarget = process.env.API_PROXY_TARGET;

if (apiProxyTarget) {
  app.use('/graphql', proxy({ target: apiProxyTarget }));
}

app.listen(process.env.UI_PORT, () => {
  console.log(`UI Server started on port ${process.env.UI_PORT}`);
});
app.get('/', (req, res) => { res.sendFile(path.resolve(__dirname, 'index.html')); });
