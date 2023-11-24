import express from "express";
import { watch } from "fs";
import { fileURLToPath } from "url";
import { exec } from "child_process";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

/**
 * @typedef {Object} Client
 * @property {number} id
 * @property {import("express").Response} response
 */

const watchPort = 5532;
const watchURI = "watch";
export const WATCH_URL = `//localhost:${watchPort}/${watchURI}`;
const app = express();

/**
 * @type {Client[]}
 */
let clients = [];

app.get(watchURI, (request, response) => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };

  response.writeHead(200, headers);
  response.json({ reload: false });
  const clientId = Date.now();

  const newClient = {
    id: clientId,
    response,
  };

  clients.push(newClient);

  request.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((client) => client.id !== clientId);
  });
});

function runServer() {
  return exec("node -h", (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout:\n${stdout}`);
  });
}

let process = runServer();
process.kill();

watch(__dirname, { recursive: true }, () => {
  process.kill();
  process = runServer();
  clients.forEach((c) => c.response.json({ reload: true }));
});

app.listen(watchPort, () => {
  console.log(`Watch SSE on port ${watchPort}`);
});
