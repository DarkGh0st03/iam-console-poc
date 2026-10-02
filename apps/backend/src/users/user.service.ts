import type {
  UpdateUserProfileInput,
  UserDetails,
  UserSummary
} from "@iam/shared";
import { InMemoryUserRepository } from "./user.repository.js";

export class UserNotFoundError extends Error {
  constructor(id: string) {
    super(`User ${id} was not found.`);
    this.name = "UserNotFoundError";
  }
}

export class UserService {
  constructor(private readonly repository: InMemoryUserRepository) {}

  listUsers(): UserSummary[] {
    return this.repository.findAll().map(({ id, displayName, email, status }) => ({
      id,
      displayName,
      email,
      status
    }));
  }

  getUser(id: string): UserDetails {
    const user = this.repository.findById(id);
    if (!user) {
      throw new UserNotFoundError(id);
    }
    return user;
  }

  updateProfile(id: string, input: UpdateUserProfileInput): UserDetails {
    const user = this.repository.findById(id);
    if (!user) {
      throw new UserNotFoundError(id);
    }

    return this.repository.save({
      ...user,
      displayName: input.displayName,
      email: input.email,
      department: input.department,
      jobTitle: input.jobTitle
    });
  }
}
