const fs = require("fs");
const path = require("path");
module.exports = getLocalFile = async (filePath) => {
  // console.log(filePath);

  const fullPath = path.join(__dirname, "../public/", filePath); // Join paths safely
  console.log(fullPath);

  const file = fs.readFileSync(fullPath); // Read file asynchronously
  return file;
};
