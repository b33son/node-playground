Run:
_ node run-express.js
_ node run loop.js

* Create express server to test
* Setup
  * npm init
    * yes to all (creates package.json)
  * npm install --save express

Benchmark using Apache Benchmark

* ab -c 50 -n 500 localhost:3000/fast
  * Make a total of 500 requests
  * -c 50 is make 50 concurrent requests

Cluster Management in Node with pm2

* http://pm2.keymetrics.io/
* Setup
  * npm install -g pm2
* Using pm2
  * pm2 start run-cluster.js -i 0
  * pm2 monit
  * pm2 delete run-cluster

Worker Threads

* https://www.npmjs.com/
* Setup
  * npm install --save webworker-threads
