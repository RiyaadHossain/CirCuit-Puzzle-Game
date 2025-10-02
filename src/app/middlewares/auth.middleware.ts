import { NextFunction, Request, Response } from "express";
import config from "../../config";
import { Secret } from "jsonwebtoken";
import APIError from "@/error/APIError";
import { jwtHelpers } from "@/helpers/jwt-helper";
import httpStatus from "http-status";

const auth =
  (...requiredRoles: string[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const authHeader = req.headers?.authorization;
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;
    if (!token) {
      throw new APIError("Authenticaion required!", httpStatus.UNAUTHORIZED);
    }

    try {
      // Access Token Verificaiton
      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.JWT_SECRET as Secret
      );

      // Role Authorization
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new APIError("Unauthorized access!", httpStatus.FORBIDDEN);
      }

      req.user = verifiedUser;
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
