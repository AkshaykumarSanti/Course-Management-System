import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const databasePath = fileURLToPath(new URL("./database.json", import.meta.url));
const port = Number(process.env.API_PORT || 5000);

async function readDatabase() {
  return JSON.parse(await readFile(databasePath, "utf8"));
}

async function writeDatabase(database) {
  await writeFile(databasePath, `${JSON.stringify(database, null, 2)}\n`, "utf8");
}

function send(response, status, data) {
  response.writeHead(status, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(data === undefined ? "" : JSON.stringify(data));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => { body += chunk; });
    request.on("end", () => {
      try { resolve(body ? JSON.parse(body) : {}); }
      catch { reject(new Error("Request body must be valid JSON")); }
    });
    request.on("error", reject);
  });
}

const server = createServer(async (request, response) => {
  if (request.method === "OPTIONS") {
    send(response, 204);
    return;
  }

  try {
    const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
    const [, collection, id] = url.pathname.split("/");
    if (!collection || !["users", "courses"].includes(collection)) {
      send(response, 404, { error: "Resource not found" });
      return;
    }

    const database = await readDatabase();
    const records = database[collection];

    if (request.method === "GET") {
      const result = id
        ? records.find((record) => String(record.id) === decodeURIComponent(id))
        : records.filter((record) => [...url.searchParams].every(([key, value]) => String(record[key]) === value));
      if (id && !result) send(response, 404, { error: "Record not found" });
      else send(response, 200, result ?? []);
      return;
    }

    if (request.method === "POST" && !id) {
      const record = await readBody(request);
      if (!record.id) record.id = randomUUID();
      if (records.some((item) => String(item.id) === String(record.id))) {
        send(response, 409, { error: "Record already exists" });
        return;
      }
      records.push(record);
      await writeDatabase(database);
      send(response, 201, record);
      return;
    }

    if (["PUT", "PATCH"].includes(request.method) && id) {
      const index = records.findIndex((record) => String(record.id) === decodeURIComponent(id));
      if (index < 0) { send(response, 404, { error: "Record not found" }); return; }
      const body = await readBody(request);
      records[index] = request.method === "PATCH" ? { ...records[index], ...body } : { ...body, id: records[index].id };
      await writeDatabase(database);
      send(response, 200, records[index]);
      return;
    }

    if (request.method === "DELETE" && id) {
      const index = records.findIndex((record) => String(record.id) === decodeURIComponent(id));
      if (index < 0) { send(response, 404, { error: "Record not found" }); return; }
      const [deleted] = records.splice(index, 1);
      await writeDatabase(database);
      send(response, 200, deleted);
      return;
    }

    send(response, 405, { error: "Method not allowed" });
  } catch (error) {
    send(response, 400, { error: error.message || "Request failed" });
  }
});

server.listen(port, () => console.log(`API server listening at http://localhost:${port}`));
