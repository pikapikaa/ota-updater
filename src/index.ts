import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { bearerAuth } from "hono/bearer-auth";
import { hotUpdater } from "./hot-updater";

const app = new Hono();

const adminToken = process.env.HOT_UPDATER_ADMIN_TOKEN;
if (!adminToken) {
  throw new Error("HOT_UPDATER_ADMIN_TOKEN is required");
}

app.use("/hot-updater/admin/*", bearerAuth({ token: adminToken }));
app.mount("/hot-updater/admin", hotUpdater.handlers.admin);
app.mount("/hot-updater", hotUpdater.handlers.client);

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`Server running at http://localhost:${info.port}`);
});
