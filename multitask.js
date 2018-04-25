/*
 * File: /Users/michaelbeeson/Documents/VSCode/nodejs/event-loop/multitask.js
 */

// customize Thread Pool
process.env.UV_THREADPOOL_SIZE = 5;

const crypto = require("crypto");
const https = require("https");
const start = Date.now();
const fs = require("fs");

function doRequest() {
  https
    .request("https://www.google.com", res => {
      res.on("data", () => {});
      res.on("end", () => {
        console.log("Request: ", Date.now() - start);
      });
    })
    .end();
}

function doHash() {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log("Hash:", Date.now() - start);
  });
}

doRequest();

fs.readFile("multitask.js", "utf8", () => {
  console.log("FS:", Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();
