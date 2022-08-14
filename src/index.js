import * as dotenv from "dotenv";
import mongooseClient from "./backend/utils/mongoose.js";
import backendApp from "./backend/app.js";
import frontendApp from "./frontend/app.js";

dotenv.config();

mongooseClient.connect(process.env.DATABASE_URL, {
  user: process.env.MONGO_INITDB_ROOT_USERNAME,
  pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { BAKCEND_PORT = 8001, FRONTEND_PORT = 8000 } = process.env;

const backend = backendApp.listen(BAKCEND_PORT, () =>
  console.log(`Backend listening on: http://localhost:${BAKCEND_PORT}`)
); // eslint-disable-line no-console
const frontend = frontendApp.listen(FRONTEND_PORT, () =>
  console.log(`Open site by this link: http://localhost:${FRONTEND_PORT}`)
); // eslint-disable-line no-console

export default { frontend, backend };
