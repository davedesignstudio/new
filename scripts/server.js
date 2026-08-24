const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "dist");
const port = process.env.PORT || 3000;
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".mp3": "audio/mpeg",
  ".ogg": "audio/ogg",
  ".xml": "application/xml",
  ".ico": "image/x-icon"
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  let file = path.join(root, urlPath);
  if (!file.startsWith(root)) {
    res.statusCode = 403;
    res.end("Forbidden");
    return;
  }
  fs.stat(file, (err, st) => {
    if (!err && st.isDirectory()) file = path.join(file, "index.html");
    fs.readFile(file, (readErr, data) => {
      if (readErr) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        fs.readFile(path.join(root, "404.html"), (e2, d2) => {
          res.end(e2 ? "Not found" : d2);
        });
        return;
      }
      res.setHeader("Content-Type", types[path.extname(file)] || "application/octet-stream");
      res.end(data);
    });
  });
});

server.listen(port, "0.0.0.0", () => {
  console.log("Philhower & Okrogly at http://localhost:" + port + "/");
});
