import express from "express";
import listEndpoints from "express-list-endpoints";
import * as middleware from "./api/middleware";
import * as setup from "./api/setup";
import { Logger } from "./api/utils";
import { config } from "./api/config";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { socketHandler } from "./versions/v1/socket";

const logger = Logger.new("app");

const app = express();
const server = createServer(app);

const io = new Server(server, { cors: { origin: "*" } });

const router = express.Router();

middleware.addMiddleware(app);

setup.setupRoutes(app, router);

io.on("connection", socketHandler);

server.listen(config.app.port, () => {
  logger.log(
    "app.listen",
    `
        
        Server is running on port ${config.app.port}
        Base URL: ${config.app.baseURL}

        Endpoints:
        ${listEndpoints(app).map(
          (e) => `
            [Path | ${e.path}]
            [Methods | ${e.methods.join(", ")}]
            [Middlewares | ${e.middlewares.join(", ")}]
        `
        )}
        `
  );
});
