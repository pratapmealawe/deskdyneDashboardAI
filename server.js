require('dotenv-flow').config();
const http = require("http");
const os = require("os");
const cluster = require("cluster");
const express = require('express');
const routeConfig = require('./config/routeConfig');
const compression = require('compression');
const responseTime = require('response-time');

const PORT = process.env.PORT || 9000

const clusterWorkerSize = os.cpus().length
console.log('environment ', process.env.NODE_ENV, PORT, clusterWorkerSize);

let startServer = () =>{
    const app = express();
    app.use(compression());
    app.use(responseTime());
    const server = http.createServer(app); 
    routeConfig(app);

    server.listen(PORT, (err) => {
      if (err) {
        console.log('Error whlile starting sever',err)
      } else {
        console.log(`Server is listening on port ${PORT} and process ${process.pid}.`);
      }
    });
}

// startServer();

if (clusterWorkerSize > 1) {
  console.log('starting multiple servers');
  if (cluster.isMaster) {
    for (let i=0; i < clusterWorkerSize; i++) {
      cluster.fork()
    }

    cluster.on("exit", function(worker) {
      console.log("Worker", worker.id, " has exitted.")
    })
  } else {
    console.log('starting master sever');
    startServer();
  }
} else {
  console.log('starting single sever');
  startServer();
}


