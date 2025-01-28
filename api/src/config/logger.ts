import winston, { Logform } from "winston";
import configs from "./configs";

const { createLogger, format } = winston;
const { printf, combine, timestamp, colorize, uncolorize } = format;

const winstonFormat = printf((obj) => {
  const { level, message, timestamp, stack } = obj;
  //   console.log(obj.);
  return `${timestamp}: ${level}: ${stack || message} `;
});
const logger = createLogger({
  level: configs.NODE_DEV === "development" ? "debug" : "info",
  format: combine(
    timestamp(),
    winstonFormat,
    configs.NODE_DEV === "development" ? colorize() : uncolorize()
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
