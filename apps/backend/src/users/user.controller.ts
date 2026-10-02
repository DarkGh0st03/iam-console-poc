import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { UserNotFoundError, UserService } from "./user.service.js";

const updateProfileSchema = z.object({
  displayName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  department: z.string().trim().min(1).max(120),
  jobTitle: z.string().trim().min(1).max(120)
});

export function createUserController(service: UserService) {
  return {
    listUsers(_request: Request, response: Response): void {
      response.json(service.listUsers());
    },

    getUser(request: Request, response: Response, next: NextFunction): void {
      try {
        response.json(service.getUser(request.params.id));
      } catch (error) {
        next(error);
      }
    },

    updateProfile(request: Request, response: Response, next: NextFunction): void {
      try {
        const input = updateProfileSchema.parse(request.body);
        response.json(service.updateProfile(request.params.id, input));
      } catch (error) {
        next(error);
      }
    }
  };
}

export function userErrorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction
): void {
  if (error instanceof UserNotFoundError) {
    response.status(404).json({ code: "USER_NOT_FOUND", message: error.message });
    return;
  }

  if (error instanceof z.ZodError) {
    response.status(400).json({
      code: "INVALID_INPUT",
      message: "The supplied user profile is invalid.",
      details: error.flatten()
    });
    return;
  }

  response.status(500).json({
    code: "INTERNAL_ERROR",
    message: "Unexpected server error."
  });
}
