import * as http from "http";
import * as url from "url";
import * as fsp from "fs/promises";

import mockdata from "./lib/mockdata.js";

const { buildings, rooms, users } = mockdata;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const options = parsedUrl.query;

  const isEqual = (method, path) => req.method === method && req.url === path;

  const isMatch = (method, path) =>
    req.method === method && req.url.includes(path);

  const hasSuffix = (suffix) =>
    req.method === "GET" && req.url.endsWith(suffix);

  const getSuffix = (urlpath = req.url) => {
    const parts = urlpath.split(".");
    return parts[parts.length - 1];
  };

  const isBackend = () => {
    return req.url.startsWith("/api/");
  };

  // Set CORS headers for cross-origin allowance
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");

  if (isBackend()) {
    // Handling back-end requests
    res.setHeader("Content-Type", "application/json");
    if (isMatch("GET", "/getBuilding")) {
      const searchQuery = options.name ? options.name.toLowerCase() : "";
      const filteredBuildings = buildings.filter((building) =>
        building.name.toLowerCase().includes(searchQuery)
      );
      setTimeout(() => {
        res.writeHead(200);
        res.end(JSON.stringify(filteredBuildings));
      }, 500);
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ message: "Route not found" }));
    }
  } else {
    // Handling front-end requests
    const getContentType = (urlpath = request.url) =>
      ({
        html: "text/html",
        css: "text/css",
        js: "text/javascript",
        png: "image/png",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        svg: "image/svg+xml",
        ico: "image/x-icon",
      })[getSuffix(urlpath)] || "text/plain";

    // Read the file from the src/client folder and send it back to the client
    const sendStaticFile = async (urlpath = request.url) => {
      urlpath = decodeURIComponent(urlpath);
      try {
        let data;
        if (
          hasSuffix(".png") ||
          hasSuffix(".jpg") ||
          hasSuffix(".jpeg") ||
          hasSuffix(".svg") ||
          hasSuffix(".ico")
        ) {
          data = await fsp.readFile("src" + urlpath);
        } else {
          data = await fsp.readFile("src" + urlpath, "utf8");
        }
        res.writeHead(200, { "Content-Type": getContentType(urlpath) });
        res.write(data);
        res.end();
        return;
      } catch (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.write(`Not Found: ${urlpath} (${err})`);
        res.end();
        return;
      }
    };

    // Return file if the request is for a static file
    if (
      ((isMatch("GET", "") || isMatch("GET", "/")) &&
        (hasSuffix(".html") || hasSuffix(".css") || hasSuffix(".js"))) ||
      hasSuffix(".png") ||
      hasSuffix(".jpg") ||
      hasSuffix(".jpeg") ||
      hasSuffix(".svg") ||
      hasSuffix(".ico")
    ) {
      sendStaticFile("/client" + req.url);
      return;
    }

    sendStaticFile("/client/index.html");
  }
});

const PORT = 3260;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
