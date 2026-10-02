import { Router } from "express";
import { createUserController } from "./user.controller.js";
import { InMemoryUserRepository } from "./user.repository.js";
import { UserService } from "./user.service.js";

export function createUserRouter(
  repository: InMemoryUserRepository = new InMemoryUserRepository()
): Router {
  const router = Router();
  const controller = createUserController(new UserService(repository));

  router.get("/", controller.listUsers);
  router.get("/:id", controller.getUser);
  router.patch("/:id/profile", controller.updateProfile);

  return router;
}
