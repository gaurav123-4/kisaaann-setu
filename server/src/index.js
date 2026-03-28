import app from './app.js';
import { connectDb } from './config/db.js';
import { env } from './config/env.js';

async function main() {
  await connectDb();
  app.listen(env.port, () => {
    console.log(`Kisan Setu API listening on http://localhost:${env.port}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
