# Rhea

Rhea is a reverse-proxy written in Node.js using the NestJS framework.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)

## Next Steps

- [x] Proof of work
- [ ] Make server URLs configurable
- [ ] Implement load balancing for each server
- [ ] Add authentication and authorization
- [ ] Improve logging and monitoring
- [ ] Write additional unit and integration tests

## Installation

To install the dependencies, run:

```bash
pnpm install
```

## Usage

To start the application in development mode, run:

```bash
pnpm run start:dev
```

To start the application in production mode, run:

```bash
pnpm run start:prod
```

## Scripts

- `build`: Build the project
- `format`: Format the code using Prettier
- `start`: Start the application
- `start:dev`: Start the application in development mode
- `start:debug`: Start the application in debug mode
- `start:prod`: Start the application in production mode
- `lint`: Lint the code using ESLint
- `test`: Run the tests using Jest
- `test:watch`: Run the tests in watch mode
- `test:cov`: Run the tests and generate coverage report
- `test:debug`: Debug the tests
- `test:e2e`: Run end-to-end tests
