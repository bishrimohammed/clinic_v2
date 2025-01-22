import jwt, { JwtPayload } from "jsonwebtoken";
import configs from "../config/configs";

type permission = {
  name: string;
  permissionId: number;
  create: boolean;
  read: boolean;
  edit: boolean;
  delete: boolean;
};
export interface TokenPayload extends JwtPayload {
  id: number;
  name: string;
  is_new: boolean;
  digital_signature: string | null;
  doctor_titer: string | null;
  role: string;
  permissions: permission[];
}

interface TokenOptions {
  expiresIn: number | string;
}

const ACCESS_TOKEN_OPTIONS: TokenOptions = {
  expiresIn: "1d",
};

const REFRESS_TOKEN_OPTIONS: TokenOptions = {
  expiresIn: "60m",
};

export const generateAccessToken = (payload: TokenPayload): string => {
  const secret = configs.JWT.ACCESS_TOKEN_SECRET!;
  return jwt.sign(payload, secret, ACCESS_TOKEN_OPTIONS);
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  const secret = configs.JWT.REFRESH_TOKEN_SECRET!;
  return jwt.sign(payload, secret, REFRESS_TOKEN_OPTIONS);
};

export const verifyAccessToken = (token: string) => {
  const secret = configs.JWT.ACCESS_TOKEN_SECRET!;
  return jwt.verify(token, secret) as TokenPayload;
};

export const verifyRefreshToken = (token: string) => {
  const secret = configs.JWT.REFRESH_TOKEN_SECRET!;
  return jwt.verify(token, secret) as TokenPayload;
};
