# IAM Console

Administration console for the users of an organization: list the users,
open a profile and edit it.

> **Example repository for a thesis proof of concept.** This project is one
> of the repositories that the AI agents of
> [*A Novel Framework for Delegated Authorization and AI Agent Interoperability in Cloud Software Engineering Workflows*](https://github.com/DarkGh0st03/delegation) work on. It is a real, runnable application, but it
> exists to show the delegation mechanism of that proof of concept at work.
> See [Role in the proof of concept](#role-in-the-proof-of-concept).

## Role in the proof of concept

In the proof of concept, a Software Engineer assigns a requirement in natural
language and a team of AI agents implements it on this repository. Every
operation of the agents is authorized by a chain of Delegation Credentials and
checked by a Gateway (Rust verification and OPA policy); the result is a Draft
Pull Request that a human reviews and merges.

IAM Console is the **main demonstration repository**. It was built to look like
a small enterprise application, because that is the setting the thesis
addresses:

- **A realistic monorepo.** An Express backend (`apps/backend`), a React and
  Vite frontend (`apps/frontend`) and shared contracts (`packages/shared`). A
  typical feature touches several of them, so the Orchestrator has to split the
  work between the **Backend**, **Frontend** and **Test** agents, each with
  its own narrower credential.
- **Sensitive code next to feature code.** `security/` holds the
  authentication middleware. The default policy of the proof of concept
  forbids agents to modify it (and `.github/`), even when a signed permission
  would cover it: the scenario shows that policy and delegated permissions are
  two independent checks.
- **A demanding, declared test profile.** `.github/test-profile.json` lists
  six phases (dependency install, typecheck, backend tests, frontend tests,
  build, Playwright end-to-end). The Engineer signs this profile together with
  the permissions, so the agents cannot change what "the tests pass" means.
  It lives in `.github/`, which agents may not touch: like the CI workflow, it
  changes only through a reviewed merge.
- **A user interface to look at.** The proof of concept detects the web
  interface, deploys every merged `main` and previews the agents' Draft PR
  before the merge, so the result is checked visually as well as by the tests.
- **Data that tests must respect.** The in-memory users in
  `user.repository.ts` are the source of truth: agents must write tests for
  them, not change them to make a test pass.

Requirements used in the demonstration include:

- *"Allow an administrator to search users by name or email and filter them
  by department from the user list page."*
- *"Allow an administrator to suspend and reactivate a user account."*

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
