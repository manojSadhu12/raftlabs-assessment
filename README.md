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
- Shared UI with **`@rur/ui`** and navigation with **`@rur/navigation`** via workspace packages
- UI kit built on React Native primitives + `react-native-web`
- **`@rur/navigation`** is a wrapper between **react-router-dom** and **react-navigation**

### API Layer
- Uses `json-graphql-server` for local development
- Schema includes: Customer, Account, Transaction

---

## CI/CD & Deployment Plan
The CI/CD process should be more robust and specific to a micro-frontend architecture.

### CI/CD flow for Micro-Frontends
Each micro-frontend gets its own pipeline.

1. **Code Commit or manual trigger:** MF pipeline starts
2. **Test & Build:** The code is tested, and then built using Webpack for web and Re.Pack for mobile.
3. **Versioning & Publish:** The build artifacts (like remoteEntry.js or .bundle) are versioned with a the supported host platform version and published to a CDN.
4. **Host Notification:** The host application is updated with the new version on reload. 

Here are the build commands for Micro-Frontends
```bash
cd into @mf module

yarn build:web
yarn build:ios
yarn build:web
```

### CI/CD flow for Host application (Platform)
The host applications have a more traditional pipeline.

1. **Code Commit or manual trigger:** Host pipeline starts
2. **Test & Build:** The host code is tested and then built.
3. **Deployment:** The web host's static files are deployed to a server, and the mobile host's .ipa or .apk files are published to the app stores.


Here are the build commands for Host (Platform)
```bash
cd platforms/web
yarn build

cd platforms/mobile
yarn build:ios
yarn build:web
```

---

## Known Limitations & Improvements

- Currently, Module Federation remotes are not versioned. This is particularly important for mobile platforms, where users may continue using older versions of the app. Without proper versioning, incompatibilities between the host and updated remote modules can arise. A versioning strategy (e.g., semver-based URLs or CDN folder structures) should be implemented to ensure backward compatibility.
- The current mobile bundles are plain JavaScript bundles. For improved runtime performance, memory usage, and startup speed—especially on Android—these can be migrated to Hermes bytecode bundles. Re.Pack provides built-in support for Hermes via a dedicated plugin. Integrating Hermes would be a valuable optimization for production builds.
- Error handling mechanisms (such as network error boundaries, fallback UIs, and retry logic) are not yet implemented. This should be addressed to improve user experience in real-world scenarios.
- The current implementation does not include unit or integration tests. Future improvements should incorporate tests using frameworks like Jest and React Native Testing Library to ensure reliability and maintainability.

---

## Primary Goals of the Architecture

### Scalable & Reusable Platform Layer

The platform layer (Web, Mobile, Server) is designed to be **loosely coupled** with the core application logic. This approach makes each platform:

- Independently versionable and **publishable to a private npm registry**
- **Reusable across multiple projects** or repositories
- Easier to maintain, since platforms act as boilerplates with low update frequency (primarily dependency updates)

This separation of concerns enhances code modularity and scalability across teams and applications.

---

### Developer Experience

Setting up a local environment to run the host application along with multiple Micro Frontends (MFEs) is typically complex and time-consuming. This architecture simplifies that process by:

- **Loosely coupling the platforms** to the host and remotes
- **Sharing platform code via Yarn Workspaces** or a private npm registry
- Reducing duplication and setup time across MFEs

Developers can focus on feature development rather than infrastructure setup.

---

### Minimal Performance Overhead

To ensure optimal performance:

- All **shared dependencies** between the host and Micro Frontends are **declared as singletons**
- This avoids duplication of packages like `react`, `react-native`, etc., across bundles
- Resulting in **smaller overall bundle sizes** and avoiding multiple instances of the same library at runtime

This approach is especially beneficial in mobile builds where performance constraints are tighter.

---

### Consistent Cross-Platform Routing

The custom shared package **`@rur/navigation`** is designed to:

- Ensure routing behavior remains **consistent between Web and Mobile**
- Support routing from **within Micro Frontends**, even when they are hosted independently
- Frameworks like Next.js and Expo are intentionally not used in this architecture, as their reliance on file-based routing poses challenges for integrating routes defined within independently deployed Module Federated applications. 

This shared routing layer makes cross-platform navigation predictable and maintainable.

---

## Demo Video

**[Click here to watch the demo](https://www.loom.com/share/4cb7de072e9240f192727e5ef0ea7ee0)**  

---
