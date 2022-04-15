import "dotenv/config";
import { Server, Socket } from "socket.io";
import { Eureka } from "eureka-js-client";
import { createServer } from "http";
import { registerAuthHandler } from "./handlers/auth";
import express from "express";
import eurekaConfig from "./eureka.config";
import os from "os";
import { AddressInfo } from "net";
import "log-timestamp";
import { Events } from "./events";
import { db } from "./db";

const PORT = 0;
const HOST = "0.0.0.0";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
let eurekaClient: Eureka;

const handleConnection = (socket: Socket) => {
  console.log(`Socket with ID ${socket.id} has connected to the gateway`);
  registerAuthHandler(io, socket);
};

io.on(Events.CONNECT, handleConnection);

app.get("/url", (req, res) => {
  // Endpoint for fetching the gateway URI, because py-eureka-client does not allow fetching the raw host
  res.send(req.headers.host);
});

httpServer.listen({ port: PORT, host: HOST }, () => {
  const info = httpServer.address() as AddressInfo;
  console.log(`Server has started on port ${info.port}`);

  // Initializing MySQL connection
  db.connect(() => {
    console.log(`Connected to MySQL`);
  });

  // Initializing Eureka client
  eurekaClient = new Eureka({
    instance: {
      app: eurekaConfig.name,
      instanceId: `${info.address}:${info.port.toString()}`,
      ipAddr: info.address,
      port: {
        $: info.port,
        "@enabled": true,
      },
      dataCenterInfo: {
        "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
        name: "MyOwn",
      },
      hostName: os.hostname(),
      vipAddress: "gateway.yescord.com",
      status: "UP",
    },
    eureka: {
      ...eurekaConfig.eureka,
      servicePath: "/eureka/apps/",
    },
  });
  eurekaClient.start();
});

process.once("SIGINT", () => {
  console.log("Cleaning up.");
  eurekaClient.stop();
  httpServer.close();
});
