/*
 * File: /Users/michaelbeeson/Documents/VSCode/nodejs/event-loop/run-express.js
 */

const express = require("express");
const cluster = require("cluster");
const crypto = require("crypto");
process.env.UV_THREADPOOL_SIZE = 1;

const app = express();
const port = 3000;

//  Is the file being executed in master mode?
if (cluster.isMaster) {
  // Causes run-express.js to be executed *again* but in child mode

  cluster.fork();
  cluster.fork();
} else {
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
}
