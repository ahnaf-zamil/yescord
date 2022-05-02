import "dotenv/config";
import { Server, Socket } from "socket.io";
import Consul from "consul";
import { createServer } from "http";
import { registerAuthHandler } from "./handlers/auth";
import express from "express";
import { AddressInfo } from "net";
import "log-timestamp";
import { Events } from "./events";
import { db } from "./db";
import { kafkaConsumer, startKafka } from "./kafka";

const PORT = 0;
const HOST = "127.0.0.1";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

let consulClient: Consul.Consul;
const instanceId =
  new Date().getTime().toString(36) + Math.random().toString(36).slice(2); // Random Id generator copied from stackoverflow

const handleConnection = (socket: Socket) => {
  console.log(`Socket with ID ${socket.id} has connected to the gateway`);
  registerAuthHandler(io, socket);
};

io.on(Events.CONNECT, handleConnection);

app.get("/url", (req, res) => {
  // Endpoint for fetching the gateway URI, because py-eureka-client does not allow fetching the raw host
  res.send(req.headers.host);
});

app.get("/health", (req, res) => {
  // Healthcheck endpoint
  res.send("ok");
});

httpServer.listen({ port: PORT, host: HOST }, () => {
  const info = httpServer.address() as AddressInfo;
  console.log(`Server has started on port ${info.port}`);

  // Initializing MySQL connection
  db.connect(() => {
    console.log("Connected to MySQL");
  });

  startKafka(process.env.KAFKA_BROKER!, io, () => {
    console.log("Connected to Kafka");
  });

  // Initializing Eureka client
  consulClient = new Consul({
    host: process.env.CONSUL_HOST,
    port: process.env.CONSUL_PORT,
    promisify: true,
  });
  consulClient.agent.service.register(
    {
      id: instanceId,
      name: "GATEWAY",
      address: info.address,
      port: info.port,
      check: {
        http: `http://${info.address}:${info.port}/health`,
        interval: "10s",
      },
    },
    (err, _result) => {
      if (err) {
        console.log(err);
        throw err;
      }

      console.log("Registered on Consul with ID: " + instanceId);
    }
  );
});

const exitHandler = async () => {
  await consulClient.agent.service.deregister(instanceId);
  console.log("Deregistered from consul");

  await kafkaConsumer?.disconnect();
  console.log("Disconnected from kafka");

  httpServer.close();
  process.exit(0);
};

process.once("SIGTERM", exitHandler);
process.once("SIGINT", exitHandler);
