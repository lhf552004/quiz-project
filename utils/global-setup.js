import dotenv from "dotenv";

export default async function globalSetup(config) {
  dotenv.config({
    path: ".env.test",
    override: true,
  });
}
