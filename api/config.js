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
  POSTGRESQL_SSL: z.preprocess(
    (v) => {
      if (typeof v === "string") {
        return v.toLowerCase() === "true";
      }
      return v;
    },
    z.boolean()
)
}).loose();

const result = configSchema.safeParse(process.env);
if (!result.success) {
  const msg = [
    "Invalid environment variables:",
    z.prettifyError(result.error)].join("\n");
  throw new Error(msg);
}

const env = result.data;
const pgSsl = result.data.POSTGRESQL_SSL;

module.exports = { env, pgSsl };