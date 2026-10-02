import type {
  ApiError,
  UpdateUserProfileInput,
  UserDetails,
  UserSummary
} from "@iam/shared";

const ADMIN_HEADERS = {
  "x-demo-role": "admin"
};

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = (await response.json()) as ApiError;
    throw new Error(error.message ?? `Request failed with ${response.status}`);
  }
  return (await response.json()) as T;
}

export async function listUsers(): Promise<UserSummary[]> {
  return parseResponse<UserSummary[]>(
    await fetch("/api/users", { headers: ADMIN_HEADERS })
  );
}

export async function getUser(id: string): Promise<UserDetails> {
  return parseResponse<UserDetails>(
    await fetch(`/api/users/${encodeURIComponent(id)}`, { headers: ADMIN_HEADERS })
  );
}

export async function updateUserProfile(
  id: string,
  input: UpdateUserProfileInput
): Promise<UserDetails> {
  return parseResponse<UserDetails>(
    await fetch(`/api/users/${encodeURIComponent(id)}/profile`, {
      method: "PATCH",
      headers: {
        ...ADMIN_HEADERS,
        "content-type": "application/json"
      },
      body: JSON.stringify(input)
    })
  );
}
