[![codecov](https://codecov.io/gh/osu-wams/dx-monorepo/branch/master/graph/badge.svg)](https://codecov.io/gh/osu-wams/dx-monorepo)
![Lint, Build, Test](https://github.com/osu-wams/dx-monorepo/workflows/Lint,%20Build,%20Test/badge.svg)

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

First set an environment variable `FONTAWESOME_TOKEN` that has access to Font Awesome Pro icons. Typically you'd add this to your shell in `.bashrc` or `.zshrc`.

```bash
export FONTAWESOME_TOKEN=xxxxxxxxxx
```

Clone the repository and install the dependencies.

```bash
git clone git@github.com:osu-wams/dx-monorepo.git
cd dx-monorepo
yarn
```

## Usage

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
