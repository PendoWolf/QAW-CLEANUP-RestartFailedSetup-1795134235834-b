import * as pendo from "pendo-server-sdk";
import { createApp } from "./app.js";

// Pendo Agent Analytics for the Tripwise Assistant. Runs once, before the server starts.
pendo.init({
  apiKey: "35e33b97-f04f-42cc-8c54-47849e574dfb",
  agentId: "rxj9cRXuV-OO0D80HXsNis1f8b8",
  endpoint: "https://app.pendo-dev.pendo-dev.com",
  autoPatch: true,
});

const port = Number(process.env.PORT) || 3001;
const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:5173";

createApp(corsOrigin).listen(port, () => {
  console.log(`Tripwise API on port ${port}, allowing ${corsOrigin}`);
});

// Send Pendo's buffered events before the process exits.
for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, async () => {
    await pendo.shutdown();
    process.exit(0);
  });
}
