import http, { Server } from "http";
import express from "express";
import loaders from "./loaders";
import logger from "./config/logger";

const unExpectedErrorHandler = (server: Server) => {
  return function (error: any) {
    logger.error("Unexpected Error:", { error });
    console.log(error);

    exitHandler(server);
  };
};

const exitHandler = (server: Server) => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const startServer = async () => {
  const app = express();

  await loaders(app);

  const httpServer = http.createServer(app);
  const server = httpServer.listen(5001, () => {
    logger.info(`server listening on port ${5001}`);
  });
  // process.on("uncaughtException", unExpectedErrorHandler(server));
  // process.on("unhandledRejection", unExpectedErrorHandler(server));

  process.on("SIGTERM", () => {
    logger.info("SIGTERM recieved");
    if (server) {
      server.close();
    }
  });
};

startServer();
