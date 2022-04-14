import "dotenv/config";
import { Server, Socket } from "socket.io";
import { Eureka } from "eureka-js-client";
import { createServer } from "http";
import { registerAuthHandler } from "./handlers/auth";
import express from "express";
import eurekaConfig from "./eureka.config";
import os from "os";

const PORT = parseInt(process.env?.PORT ?? "4000");
const HOST = "0.0.0.0";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const eurekaClient = new Eureka({
  instance: {
    app: eurekaConfig.name,
    ipAddr: HOST,
    port: {
      $: PORT,
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

const handleConnection = (socket: Socket) => {
  registerAuthHandler(io, socket);
};

io.on("connection", handleConnection);

app.get("/url", (req, res) => {
  // Endpoint for fetching the gateway URI, because py-eureka-client does not allow fetching the raw host
  res.send(req.headers.host);
});

httpServer.listen({ port: PORT, host: HOST }, () => {
  console.log(`Listening on port ${PORT}`);
  eurekaClient.start();
});
