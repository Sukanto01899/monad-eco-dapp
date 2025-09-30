import { PrivyClient } from "@privy-io/server-auth";
// import "dotenv/config";

const privy = new PrivyClient(
  process.env.PRIVY_APP_ID!,
  process.env.PRIVY_SECRET_ID!
);

export default privy;
