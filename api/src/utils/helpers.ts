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
/**
 * Get the uploaded file path for a given key.
 *
 * @param files - The files object from Multer.
 * @param key - The key for the desired file.
 * @returns The constructed file path or null if not found.
 */
export const getUploadedFilePath = (
  files: { [key: string]: Express.Multer.File[] },
  key: string
): string | null => {
  const file = files?.[key]?.[0];
  if (!file) {
    console.warn(`No file found for key: ${key}`);
    return null;
  }
  if (!file.filename) {
    console.warn(`Filename is missing for key: ${key}`);
    return null;
  }
  return `uploads/${file.filename}`;
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

import { parse, format } from "date-fns";

/**
 * Combines a date and time string into a single Date object and formats it.
 * @param date - The date string in "yyyy-MM-dd" format.
 * @param time - The time string in "HH:mm" or "HH:mm:ss" format.
 * @param outputFormat - The desired output format (default: "yyyy-MM-dd HH:mm:ss").
 * @returns A formatted date-time string.
 */
export const combineAndFormatDateTime = (
  date: string,
  time: string,
  outputFormat: string = "yyyy-MM-dd HH:mm:ss"
): string => {
  const [hours, minutes, seconds = 0] = time.split(":").map(Number);
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());

  const dateTime = new Date(
    parsedDate.getFullYear(),
    parsedDate.getMonth(),
    parsedDate.getDate(),
    hours,
    minutes,
    seconds
  );

  return format(dateTime, outputFormat);
};
