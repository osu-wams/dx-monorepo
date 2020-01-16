[![codecov](https://codecov.io/gh/osu-wams/dx-monorepo/branch/master/graph/badge.svg)](https://codecov.io/gh/osu-wams/dx-monorepo)

## Features

- 🐈 Yarn Workspaces
- 🐉 Lerna 3
- 👨‍🔬 Test all workspaces with Eslint & Jest using one command

## Contents

- [Contents](#contents)
- [Setup](#setup)
  - [Pre-Requisites](#pre-requisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Linting &amp; Testing](#linting-amp-testing)

## Setup

### Pre-Requisites

- [NVM](https://github.com/nvm-sh/nvm#installation-and-update)
- [Yarn (install via NPM)](https://yarnpkg.com/en/docs/install#alternatives-stable)

### Installation

```bash
git clone git@github.com:osu-wams/dx-monorepo.git
cd dx-monorepo
yarn
```

## Usage

### Linting & Testing

```bash
yarn workspace <workspace-root> test
```
