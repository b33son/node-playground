/*
 * File: /Users/michaelbeeson/Documents/VSCode/nodejs/event-loop/run-worker.js
 */

const express = require("express");
const cluster = require("cluster");
const crypto = require("crypto");
const Worker = require("webworker-threads").Worker;

//process.env.UV_THREADPOOL_SIZE = 1;

const app = express();
const port = 3000;

const startX = Date.now();
// I'm a child. Will act like a server and do nothing else

app.get("/", (req, res) => {
  const worker = new Worker(function() {
    // must use function and not arrow function (=>)
    // => arrow would refer to context of route handler
    // "this" refers to worker
    this.onmessage = function() {
      // this function is invoked when worker.postMessage() is executed

      let counter = 0;
      while (counter < 1e9) {
        counter++;
      }

      postMessage(counter);
    };
  });

  worker.onmessage = function(message) {
    // this function is invoked by postMessage(counter)
    console.log(message.data);
    res.send("" + message.data);
  };

  worker.postMessage();

  console.log(`Done running after : ${Date.now() - startX} (ms)`);
});

app.get("/fast", (req, res) => {
  res.send("Fast route activated.");
});

app.listen(port);
console.log(`Now running at http://localhost:${port}`);
