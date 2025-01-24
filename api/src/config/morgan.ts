import fs from "fs";
import morgan from "morgan";
import path from "path";

const acceessLogPath = path.join(__dirname, "..", "logs/access.log");

const writeAccessLogStreeam = fs.createWriteStream(acceessLogPath, {
  flags: "a",
});
const Morgan = morgan("combined", {
  stream: writeAccessLogStreeam,
});

export default Morgan;
