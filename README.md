[![codecov](https://codecov.io/gh/osu-wams/dx-monorepo/branch/master/graph/badge.svg)](https://codecov.io/gh/osu-wams/dx-monorepo)

## Apps

- [DX](#dx)
- [DX-Mobile](#dx-mobile)
- [DX-Server](#dx-server)

## Features

- ⚛️ Create React App 3 (React 16.8)
- 📖 Storybook 5
- 🐈 Yarn Workspaces
- 🐉 Lerna 3
- ✨ Host Multiple CRA Apps, Component Libraries & Storybooks in one Monorepo
- 🔥 Hot Reload all Apps, Components & Storybooks
- 👨‍🔬 Test all workspaces with Eslint & Jest using one command

## Contents

- [Contents](#contents)
- [Setup](#setup)
  - [Pre-Requisites](#pre-requisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Starting The React App](#starting-the-react-app)
  - [Starting The Storybook](#starting-the-storybook)
  - [Linting &amp; Testing](#linting-amp-testing)
  - [Deploying to GitHub Pages](#deploying-to-github-pages)
  - [Creating a New CRA App](#creating-a-new-cra-app)
- [How Does It Work?](#how-does-it-work)

## Setup

### Pre-Requisites

- [Docker](https://docs.docker.com/install/)
- [NVM](https://github.com/nvm-sh/nvm#installation-and-update)
- [Yarn (install via NPM)](https://yarnpkg.com/en/docs/install#alternatives-stable)

### Installation

```bash
git clone git@github.com:osu-wams/dx-monorepo.git
cd dx-monorepo
yarn
```

## Usage

### Starting the Backend and Frontend with SAML Authentication

Open two terminals;

```bash
yarn workspace dx start
```

```bash
yarn workspace dx-server saml
```

### Starting the Mobile App

```bash
yarn workspace dx-mobile start
```

### Starting The Storybook

```bash
yarn workspace @project/storybook storybook
```

### Linting & Testing

```bash
yarn workspace <workspace-root> test
```

## Apps

### DX

This is the mobile-first React web application found in `packages/apps/dx`.

### DX Mobile

This is the React Native mobile application found in `packages/apps/dx-mobile`.

### DX Server

This is the Express node server application found in `packages/apps/dx-server`.
