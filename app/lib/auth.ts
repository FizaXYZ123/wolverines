import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/app/lib/prisma";
import { decode } from "punycode";

export class AuthError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AuthError";
    this.status = status;
  }
}

type JwtPayload = {
  userId: string;
  role: "USER" | "ADMIN";
};

export async function requireAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    throw new AuthError("UnAuthorised : No token provided", 401);
  }

  const [type, token] = authHeader.split(" ");

  if (type != "Bearer" || !token) {
    throw new AuthError("UnAuthorised : Invalid token format", 401);
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new AuthError("Internal Server Error: JWT_SECRET is not configured", 500);
  }

  let decoded: JwtPayload;
  try {
    decoded = jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    throw new AuthError("Invalid or expired token", 401);
  }

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.userId,
    },
    select: {
      id: true,
      role: true,
      email: true,
      name: true,
    }
  });

  if (!user) {
    throw new AuthError("user not found", 404);
  }

  if (user.role !== 'ADMIN') {
    throw new AuthError("Forbidden Access", 403);
  }

  return user;
}
