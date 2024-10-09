![Banner](public/img/ssr_editor.jpg)

<div align="center">

The frontend of a starter project for the [DV1677 JSRamverk](https://jsramverk.se) course.

![Stars](https://img.shields.io/github/stars/robjoh01/ssr-editor-frontend)

![Issues](https://img.shields.io/github/issues/robjoh01/ssr-editor-frontend)
![Closed issues](https://img.shields.io/github/issues-closed/robjoh01/ssr-editor-frontend)
![Pull requests](https://img.shields.io/github/issues-pr/robjoh01/ssr-editor-frontend)
![Closed pull requests](https://img.shields.io/github/issues-pr-closed/robjoh01/ssr-editor-frontend)

</div>

## Overview

SSR-Editor is a real-time web application for creating and editing documents collaboratively. Built with **React** and **WebSockets**, it enables multiple users to write and edit documents simultaneously, with instant updates across all connected clients.

## Frameworks & Libraries

- [React](https://react.dev)
- [Node.js](https://nodejs.org)
- [NPM](https://www.npmjs.com)

## Getting Started

1. Install the necessary dependencies by running:
   ```bash
   npm install
   ```

2. Create the following `.env` files in the root of your project:

   - **.env.development**:
     ```
     VITE_API_URL=http://localhost:1338/api  # Backend URL with port
     VITE_BASENAME="" # Basename for Router
     ```

   - **.env.production**:
     ```
     VITE_API_URL=<your_production_url>  # Backend URL for production
     VITE_BASENAME="~<your_acronym>/editor" # Basename for Router
     ```

   - **.env (optional)**: You can create this file to set the `PORT` for the frontend application:
     ```
     VITE_DEPLOY_USER=<your_acronym> # BTH acronym user for deploying
     ```

3. To launch the application in development mode, use:
   ```bash
   npm start
   ```

4. To create a production-ready build of the application, run:
   ```bash
   npm run build
   ```

5. To fix vulnerabilities in the application, run:
   ```bash
   npm audit
   ```

## Testing

1. To run GUI tests:
   ```bash
   npm run test
   ```

> [!NOTE]
> If you are on WSL, you might need to run `npx expose-wsl@latest` to expose the WSL port.