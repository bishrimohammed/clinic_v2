import http from "http";
import express from "express";
import loaders from "./loaders";
import dotenv from "dotenv";
// require("dotenv").config();

const startServer = async () => {
  const app = express();
  //   dotenv.config();
  console.log(process.env.DATABASE_HOST);

  await loaders(app);

  const httpServer = http.createServer(app);
  const server = httpServer.listen(5001, () => {
    console.log();
    `server listening on port ${5001}`;
  });
};

startServer();
