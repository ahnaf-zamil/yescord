import "dotenv/config";
import { Server, Socket } from "socket.io";
import { Eureka } from "eureka-js-client";
import { createServer } from "http";
import { registerAuthHandler } from "./handlers/auth";
import express from "express";
import eurekaConfig from "./eureka.config";
import os from "os";
import { AddressInfo } from "net";

const PORT = 0;
const HOST = "0.0.0.0";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
let eurekaClient: Eureka;

const handleConnection = (socket: Socket) => {
  registerAuthHandler(io, socket);
};

io.on("connection", handleConnection);

app.get("/url", (req, res) => {
  // Endpoint for fetching the gateway URI, because py-eureka-client does not allow fetching the raw host
  res.send(req.headers.host);
});

httpServer.listen({ port: PORT, host: HOST }, () => {
  const info = httpServer.address() as AddressInfo;
  console.log(`Server has started on port ${info.port}`);

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
  console.log("Cleaning up");
  eurekaClient.stop();
  httpServer.close();
});
