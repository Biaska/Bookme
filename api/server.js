const app = require('./index.js')
const PORT = parseInt(process.env.PORT, 10);

const server = app.listen(PORT, () => {
    console.log(`Bookme server listening on port ${PORT}`)
  });


  server.keepAliveTimeout = 120 * 1000;
  server.headersTimeout = 120 * 1000;