import { User } from "../user/user.model";
import bcrypt from "bcrypt";
import { Secret } from "jsonwebtoken";
import APIError from "@/error/APIError";
import httpStatus from "http-status";
import { jwtHelpers } from "@/helpers/jwt-helper";
import config from "@/config";

const register = async (registerData: any) => {
  const { username, email, password } = registerData;

  // Check if username or email exists
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    throw new APIError("Username or email already exists", httpStatus.CONFLICT);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create account
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return newUser;
};

const login = async (loginData: any) => {
  const { username, password } = loginData; // username can be username or email

  // Find user by username or email
  const user = await User.findOne({
    username,
  });
  if (!user) {
    throw new APIError("Invalid credentials", httpStatus.BAD_REQUEST);
  }

  // Verify password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    throw new APIError("Invalid credentials", httpStatus.UNAUTHORIZED);

  // Generate tokens
  const accessToken = jwtHelpers.createToken(
    { userId: user._id },
    config.JWT_SECRET as Secret,
    config.JWT_EXPIRATION as string
  );
  const refreshToken = jwtHelpers.createToken(
    { userId: user._id },
    config.JWT_REFRESH_SECRET as Secret,
    config.JWT_REFRESH_EXPIRATION as string
  );

  return { user, accessToken, refreshToken };
};

const refreshToken = async (token: string) => {
  let payload;
  try {
    payload = jwtHelpers.verifyToken(
      token,
      config.JWT_REFRESH_SECRET as Secret
    );
  } catch {
    throw new APIError(
      "Expired or invalid refresh token",
      httpStatus.UNAUTHORIZED
    );
  }

  // Issue new access token
  const accessToken = jwtHelpers.createToken(
    { userId: payload.userId },
    config.JWT_SECRET as Secret,
    config.JWT_EXPIRATION as string
  );
  return { accessToken };
};

const logout = async (token: string) => {
  return { message: "Logged out successfully" };
};

export const AuthService = {
  register,
  login,
  refreshToken,
  logout,
};
