# IAM Console PoC — Baseline Repository

Reference application for the thesis Proof of Concept **“A Novel Framework for Delegated Authorization and AI Agent Interoperability in Cloud Software Engineering Workflows.”**

This repository intentionally represents the **baseline before the Account Suspension feature is implemented by the multi-agent workflow**.

## Baseline capabilities

The administration console currently supports:

- listing users;
- viewing user details;
- editing basic profile information;
- displaying the current account status (`ACTIVE`).

It deliberately **does not** provide account suspension/reactivation endpoints or UI actions yet. Those changes are reserved for the thesis multi-agent task.

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
│           ├── components/UserStatusBadge.tsx
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
└── .github/workflows/ci.yml
```

## Sensitive area

`security/` is intentionally separated from application feature code. In the thesis PoC this directory will be treated as a **protected, out-of-scope resource** for specialized agents.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

The frontend sends the demo administrative role header required by the backend security middleware.

## Test and build

```bash
npm test
npm run build
```

For end-to-end tests, first install Playwright's browser once:

```bash
npx playwright install chromium
npm run test:e2e
```

## Future thesis task: Account Suspension

The later multi-agent workflow will implement:

- `POST /api/users/:id/suspend`;
- `POST /api/users/:id/reactivate`;
- `ACTIVE ↔ SUSPENDED` state transitions;
- frontend Suspend / Reactivate actions;
- backend, frontend and E2E tests.

Those changes are intentionally absent from this baseline.
