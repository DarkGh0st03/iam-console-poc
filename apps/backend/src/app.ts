import cors from "cors";
import express from "express";
import { requireAdminRole } from "@iam/security";
import { InMemoryUserRepository } from "./users/user.repository.js";
import { createUserRouter } from "./users/user.routes.js";
import { userErrorHandler } from "./users/user.controller.js";

export interface AppDependencies {
  userRepository?: InMemoryUserRepository;
}

export function createApp(dependencies: AppDependencies = {}) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/health", (_request, response) => {
    response.json({ status: "ok" });
  });

  app.use("/api/users", requireAdminRole);
  app.use(
    "/api/users",
    createUserRouter(dependencies.userRepository ?? new InMemoryUserRepository())
  );

  app.use(userErrorHandler);

  return app;
}
