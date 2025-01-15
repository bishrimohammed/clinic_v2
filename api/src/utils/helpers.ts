import fs from "fs";
import { Request } from "express";
import { ApiError } from "../shared/error/ApiError";

// export const phoneRegex = /^(07|09)\d{8}$/;
export const removeLocalFile = (localpath: string) => {
  // const fullpath = path.join(__dirname, "../public", filepath);
  fs.unlink(localpath, (err) => {
    if (err) {
      console.log("Unable ro remove the file : " + err);
    }
    console.log(localpath + " removed successfully");
  });
};

export const removeUnusedMulterImageFilesOnError = (request: Request) => {
  const req = request;
  const multerFile = req.file;
  const multerFiles = req.files;

  if (multerFile) {
    removeLocalFile(multerFile.path);
  }
  if (multerFiles) {
    const filesValueArray = Object.values(
      multerFiles as { [fieldname: string]: Express.Multer.File[] }
    );

    filesValueArray.map((fileFields) => {
      fileFields.map((fileObject) => {
        removeLocalFile(fileObject.path);
      });
    });
  }
};

export const parseJSON = (value: string): any => {
  try {
    return JSON.parse(value);
  } catch (error) {
    throw new ApiError(400, "Invalid JSON format");
  }
};

export const parseDate = (value: string): any => {
  try {
    return new Date(value.slice(0, 10));
  } catch (error) {
    throw new ApiError(400, "Invalid Date format");
  }
};
