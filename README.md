# [Aba Padhxu](https://github.com/rahulrajdahal/aba-padhxu). Buy and sell Books

## Installation

### 🏗 clone the repository

```sh
git clone  https://github.com/rahulrajdahal/aba-padhxu.git
```

### 2. Install Dependencies

```sh
cd aba-padhxu && npm install
```

### 3. 💾Run the development server

```sh
npm run dev
```

#### OR

### 3. 💾Run the production server

```sh
npm run start
```

## Preview

[![Aba Padhxu](./screenshots/abapadhxu.png)](https://aba-padhxu.vercel.app/)
![Aba Padhxu Order](./screenshots/abapadhxu-order.png)

## 🚀 Project Structure

Inside of project [aba-padhxu](https://github.com/rahulrajdahal/aba-padhxu), you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── app/
|   ├── page/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   ├── page.tsx
│   └── layout.tsx
├── components/
│   ├── index.ts
│   └── Component
|       └── Component.tsx
|       └── Component.stories.ts
|       └── Component.cy.tsx
├── cypress/
│   ├── e2e
│   │   └── e2etest.cy.ts
│   ├── fixtures
│   └── support
├── hooks/
│   └── index.ts
├── utils/
│   ├── helpers.ts
│   └── routes.ts
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                      | Action                                        |
| :--------------------------- | :-------------------------------------------- |
| `npm install`                | Installs dependencies.                        |
| `npm run dev`                | Starts local dev server at `localhost:3000`.  |
| `npm run build`              | Build your production site to `./next/`.      |
| `npm run start`              | Preview your build locally, before deploying. |
| `npm run lint`               | Check all linting errors.                     |
| `npm run storybook`          | Start Storybook local dev server.             |
| `npm run build-storybook`    | Build Storybook production site.              |
| `npm run cypress:open`       | Run Cypress test.                             |
| `npm run e2e`                | Run Cypress E2E test.                         |
| `npm run e2e:headless`       | Run headless Cypress E2E test.                |
| `npm run component`          | Run headless Cypress components test.         |
| `npm run component:headless` | Run headless Cypress components test.         |
