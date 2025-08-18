require("dotenv").config();
const z = require("zod");

const configSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.preprocess((v) => (Number(v)) ,z.number()),

  AUTH0_DOMAIN: z.string(),
  AUTH0_AUDIENCE: z.string(),

  CLIENT_ORIGIN_URL: z.string(),

  POSTGRESQL_HOST: z.string().min(1),
  POSTGRESQL_PORT: z.preprocess((v) => (Number(v)) ,z.number()),
  POSTGRESQL_DB: z.string().min(1),
  POSTGRESQL_USER: z.string().min(1),
  POSTGRESQL_PASSWORD: z.string().min(1),
  POSTGRESQL_SSL: z.preprocess((v) => (Boolean(v)) ,z.boolean()),
}).loose();

const result = configSchema.safeParse(process.env);
if (!result.success) {
  console.error("Invalid environment variables:");
  console.error(z.prettifyError(result.error));
  process.exit(1);
}

const env = result.data;
const pgSsl = false;

module.exports = { env, pgSsl };