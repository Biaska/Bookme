const app = require('./index.js');
const { env } = require("./config.js");
const db = require('./db/db.js');

const PORT = parseInt(env.PORT, 10);


(async () => {
  try {
    await db.resetDatabase();
  } catch (err) {
    console.error("Database init failed:", err);
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bookme server listening on port ${PORT}`);
  });

  server.keepAliveTimeout = 120 * 1000;
  server.headersTimeout = 120 * 1000;
})();