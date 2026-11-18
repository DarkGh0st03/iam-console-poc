# IAM Console

Administration console for the users of an organization: list the users,
open a profile and edit it.

## Features

- user list with initials avatar, colour-coded department and account status;
- user detail page;
- profile editing (display name, email, department, job title);
- account status (`ACTIVE`).

## Repository structure

```text
iam-console-poc/
├── apps/
│   ├── backend/
│   │   └── src/
│   │       ├── app.ts
│   │       ├── server.ts
│   │       └── users/
│   │           ├── user.model.ts
│   │           ├── user.repository.ts
│   │           ├── user.service.ts
│   │           ├── user.controller.ts
│   │           └── user.routes.ts
│   └── frontend/
│       └── src/
│           ├── api/users-api.ts
│           ├── components/
│           │   ├── DepartmentTag.tsx
│           │   ├── UserAvatar.tsx
│           │   └── UserStatusBadge.tsx
│           └── pages/
│               ├── UserListPage.tsx
│               └── UserDetailPage.tsx
├── packages/
│   └── shared/
│       └── src/
│           ├── account-status.ts
│           ├── user-contracts.ts
│           └── index.ts
├── security/
│   └── src/
│       ├── auth-middleware.ts
│       ├── security-config.ts
│       └── index.ts
├── tests/
│   ├── backend/
│   │   ├── user.service.test.ts
│   │   └── user.routes.test.ts
│   ├── frontend/
│   │   └── UserDetailPage.test.tsx
│   └── e2e/
│       └── user-profile.spec.ts
└── .github/
    ├── workflows/ci.yml
    └── test-profile.json
```

## Security

`security/` holds the authentication middleware and its configuration,
separated from the feature code.

## Reproducible toolchain

The toolchain is pinned to:

- Node.js `22.15.0`;
- npm `10.9.2`.

The repository includes `package-lock.json`; use `npm ci` for reproducible dependency installation. A matching Node version is also declared in `.nvmrc`.

## Run locally

```bash
npm ci
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

The frontend sends the administrative role header required by the backend
security middleware.

## Test and build

```bash
npm run typecheck
npm test
npm run build
```

For end-to-end tests, install Playwright's Chromium browser once:

```bash
npx playwright install chromium
npm run test:e2e
```

## Test profile

`.github/test-profile.json` describes how the controlled test runner executes
the project checks (dependency install, typecheck, backend and frontend tests,
build, end-to-end). Like the CI workflow, it changes only through a reviewed
merge.
