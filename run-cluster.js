/*
 * File: /Users/michaelbeeson/Documents/VSCode/nodejs/event-loop/run-cluster.js
 */

const express = require("express");
const cluster = require("cluster");
const crypto = require("crypto");

//process.env.UV_THREADPOOL_SIZE = 1;

const app = express();
const port = 3000;

const startX = Date.now();
// I'm a child. Will act like a server and do nothing else

app.get("/", (req, res) => {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    res.send("Done running pbkdf2 ");
  });

  console.log("Done running at: ", Date.now() - startX);
});

app.get("/fast", (req, res) => {
  res.send("Fast route activated.");
});

app.listen(port);
console.log(`Now running at http://localhost:${port}`);
