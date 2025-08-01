# Cross-Platform Banking Portal – Micro Frontend Architecture

A robust, enterprise-grade **Customer Banking Portal** built with a true **cross-platform Micro Frontend (MF)** architecture using:

- Webpack 5 (for Web MFs + Shell)
- Re.Pack 5 (for React Native MFs + Shell)
- `json-graphql-server` for mock backend
- Shared UI and utilities via Yarn Workspaces
- 100% TypeScript across all packages

---

## Project Overview

This solution showcases:

- **Cross-platform Micro Frontends** using `React Native` + `react-native-web`
- **Module Federation** across both **Web** and **React Native**
- **GraphQL-based data access** via a local mock server
- **Independent deployment of MFs**
- **Shared UI and logic via monorepo** using Yarn Workspaces

> 💡 This approach enables scalable, independently deployable micro frontends that work seamlessly across platforms (Web & Mobile).

---

## Folder & Workspace Structure

```bash
├── platforms/
│   ├── web/              # 🖥️ Web shell (host app, Webpack 5)
│   ├── mobile/           # 📱 Mobile shell (host app, Re.Pack 5)
│   └── server/           # 🌐 GraphQL mock server
├── app/                  # 🚀 Entry-point
├── app-configs/          # 🚀 Webpack, Re.Pack configs
├── mf-apps/
│   ├── account-details/  # 🛸 Micro Frontend 1: Account Overview
│   └── transactions/     # 🛸 Micro Frontend 2: Transaction History and Details
├── shared-packages/
│   ├── event-bus/        # 📦 Global event bus for inter-MF communication
│   ├── navigation/       # 📦 Shared navigation (React Navigation setup)
│   └── ui/               # 📦 Reusable cross-platform UI components
```

---

## Yarn Workspaces Breakdown

The project is structured using **Yarn workspaces** for modularity and maximum reusability.

```json
"workspaces": [
  "platforms/*",
  "app",
  "app-configs",
  "mf-apps/*",
  "shared-packages/*"
]
```

### Platforms
- **`platforms/web`** — 🖥️ Web host shell (Webpack 5)
- **`platforms/mobile`** — 📱 Mobile host shell (Re.Pack 5)
- **`platforms/server`** — 🌐 GraphQL mock server with json-graphql-server

### App Bootstraps
- **`app`** — Shared entry point logic (platform bootstrapper). NavigationContainer,
- **`app-configs`** — Centralized Webpack, Re.Pack, TS configs

### Micro Frontends
- **`mf-apps/account-details`** — 🛸 Account Overview MF (exposes via Module Federation)
- **`mf-apps/transactions`** — 🛸 Transactions MF (also exposes via Module Federation)

### Shared Packages
- **`shared-packages/event-bus`** — 📦 Global event bus for MF communication
- **`shared-packages/navigation`** — 📦 Cross-platform navigation config
- **`shared-packages/ui`** — 📦 React Native Web UI components

---

## Setup Instructions

### 1. System Requirements

Node version: 22.17.1
Yarn version: 4.9.2
Ensure iOS and Android are setup as per the offical [React Native setup guide](https://reactnative.dev/docs/set-up-your-environment)


### 2. Clone & Install

```bash
git clone https://github.com/manojSadhu12/raftlabs-assessment.git
cd raftlabs-assessment
yarn install
```

### 3. Run iOS App

```bash
cd platforms/mobile/ios
pod install

cd ..
yarn run ios
```

### 4. Run Android App

```bash
cd platforms/mobile
yarn run android
```


### 5. Start dev server of All Applications

```bash
yarn start
```

### 6. Access in Browser

```bash
http://localhost:3000
```

---

## Architectural Decisions & Justifications

### Platforms are just boilerplates
**`platforms/web`** and **`platforms/mobile`** are just boilerplates with webpack and module federation configures. no app specific code is written in this.

These platforms depend on **`app`** and **`app-configs`** modules to work with the app.

Due to this Architecture platforms can be easily copied to other apps. 

### Micro Frontends
- Independent apps built using React Native primitives
- Expose `remoteEntry.js` for dynamic loading
- No coupling between MFs

### Federation & Communication
- Host uses `Webpack 5` or `Re.Pack` depending on platform
- Cross-MF communication handled via global **`@rur/event-bus`**

### Shared Layer
- Shared UI with **`@nur/ui`** and navigation with **`@nur/navigation`** via workspace packages
- UI kit built on React Native primitives + `react-native-web`
- **`@nur/navigation`** is a wrapper between **react-router-dom** and **react-navigation**

### API Layer
- Uses `json-graphql-server` for local development
- Schema includes: Customer, Account, Transaction

---

## CI/CD & Deployment Plan

### CI/CD Flow

```yaml
# Suggested steps per MF or shell
- Detect change in package
- Run lint and test
- Build using Webpack or Re.Pack
- Publish static artifacts to CDN
- Update host `remoteEntry` map
```

```bash
cd into @mf module

yarn build:web
yarn build:ios
yarn build:web
```

---

## Known Limitations & Improvements

- Currently, Module Federation remotes are not versioned. This is particularly important for mobile platforms, where users may continue using older versions of the app. Without proper versioning, incompatibilities between the host and updated remote modules can arise. A versioning strategy (e.g., semver-based URLs or CDN folder structures) should be implemented to ensure backward compatibility.
- Error handling mechanisms (such as network error boundaries, fallback UIs, and retry logic) are not yet implemented. This should be addressed to improve user experience in real-world scenarios.
- The current implementation does not include unit or integration tests. Future improvements should incorporate tests using frameworks like Jest and React Native Testing Library to ensure reliability and maintainability.

---

## Demo Video

**[Click here to watch the demo](https://www.loom.com/share/4cb7de072e9240f192727e5ef0ea7ee0)**  

---
