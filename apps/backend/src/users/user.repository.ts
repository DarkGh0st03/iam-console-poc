import { ACCOUNT_STATUS } from "@iam/shared";
import type { UserEntity } from "./user.model.js";

const DEFAULT_USERS: UserEntity[] = [
  {
    id: "usr-001",
    displayName: "Alice Romano",
    email: "alice.romano@example.test",
    department: "Engineering",
    jobTitle: "Software Engineer",
    status: ACCOUNT_STATUS.ACTIVE
  },
  {
    id: "usr-002",
    displayName: "Marco Bianchi",
    email: "marco.bianchi@example.test",
    department: "Finance",
    jobTitle: "Financial Analyst",
    status: ACCOUNT_STATUS.ACTIVE
  },
  {
    id: "usr-003",
    displayName: "Sara Conti",
    email: "sara.conti@example.test",
    department: "Human Resources",
    jobTitle: "HR Specialist",
    status: ACCOUNT_STATUS.ACTIVE
  }
];

export class InMemoryUserRepository {
  private readonly users = new Map<string, UserEntity>();

  constructor(seed: UserEntity[] = DEFAULT_USERS) {
    for (const user of seed) {
      this.users.set(user.id, structuredClone(user));
    }
  }

  findAll(): UserEntity[] {
    return [...this.users.values()].map((user) => structuredClone(user));
  }

  findById(id: string): UserEntity | undefined {
    const user = this.users.get(id);
    return user ? structuredClone(user) : undefined;
  }

  save(user: UserEntity): UserEntity {
    this.users.set(user.id, structuredClone(user));
    return structuredClone(user);
  }
}
