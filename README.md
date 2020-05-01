[![codecov](https://codecov.io/gh/osu-wams/dx-monorepo/branch/master/graph/badge.svg)](https://codecov.io/gh/osu-wams/dx-monorepo)
![Lint, Build, Test](https://github.com/osu-wams/dx-monorepo/workflows/Lint,%20Build,%20Test/badge.svg)

## Contents

- [Setup](#setup)
  - [Pre-Requisites](#pre-requisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Local Development Workflow](#local-development-workflow)
  - [Linting &amp; Testing](#linting-amp-testing)

## Setup

### Pre-Requisites

- [NVM](https://github.com/nvm-sh/nvm#installation-and-update)
- [Yarn (install via NPM)](https://yarnpkg.com/en/docs/install#alternatives-stable)

### Installation

First set an environment variable `FONTAWESOME_TOKEN` that has access to Font Awesome Pro icons, and `GITHUB_NPM_TOKEN` that has access to publish the Github NPM registry. Typically you'd add this to your shell in `.bashrc` or `.zshrc`.

```bash
export FONTAWESOME_TOKEN=xxxxxxxxxx
export GITHUB_NPM_TOKEN=xxxxxxxxxx
```

Clone the repository and install the dependencies.

```bash
git clone git@github.com:osu-wams/dx-monorepo.git
cd dx-monorepo
yarn
```

## Usage

### Local Development Workflow

When updating a package being used by another project, such as `dx` or `dx-server`, it can be convenient to make use of the specific package in `dx-monorepo` prior
to publishing it as an official version to the package registry. Here's a workflow for accomplishing this, for example using the `dx` project;

- (**dx** project) Use the local code for the package by updating `package.json`, and setting dependencies for `"@osu-wams/lib": "file:../dx-monorepo/packages/lib"`, or the appropriate local path for your system.
- (**dx** project) Remove currently installed node module, run: `rm -rf node_modules/@osu-wams`
- (**dx-monorepo** project) Make code updates then build, run: `yarn build` or `yarn workspace @osu-wams/lib build`
- (**dx** project) Install new local build module, run: `yarn`
- (**dx** project) You might need to restart the Typescript Server, this is sometimes needed for VSCode, use the Command Palette and run `Typescript: Reset TS Server`

**WARNING:** Don't forget to publish the updated `dx-monorepo` module(s), then update the `package.json` in the project to use the latest deployed version once the code is complete.

### Linting & Testing

```bash
yarn lint
yarn test
```

### Building and Publishing

- Update `package.json` of the particular package (hooks, lib) to the desired version.

Make sure you have node `10.15.x` installed

- Inside the root directory after you have done your changes:

```bash
nvm use 10.15.3
yarn build
```

- When you are ready to deploy the package to github npm:

```bash
yarn publish
```
