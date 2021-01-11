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
- [Yalc (install as global Yarn)](https://github.com/wclr/yalc)
  ```bash
  yarn global add yalc
  ```

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

Working on the monorepo and testing integration _before publishing updated packages_ is easy with `yalc`. Here's the workflow;

- (**dx-monorepo**) : Code some updates, then build and publish all packages to the local `yalc` cache.

  ```bash
  yarn publish:local

  // or if you want to publish only one package

  cd packages/<package> && yalc publish --update
  ```

- (**dx**) : Link to the package(s) to use the local yalc cache to use the _yalc published_ packages locally.
  ```bash
  yalc link @osu-wams/lib
  yalc link @osu-wams/hooks
  ```
- Anytime there are updates to `dx-monorepo` that you want to get to the front end, you have to build/publish and then link again;
  - In **dx-monorepo** : `yarn publish:local`
  - In **dx** : `yalc link <package-name>`
- **Bonus** In testing, you can leave the DX front end running as each time `yalc link <package-name>` runs it will cause the front end to recompile with the updated package.

**WARNING:** Don't forget to publish the updated `dx-monorepo` module(s), then update the `package.json` in the project to use the latest deployed version once the code is complete.

### Linting & Testing

```bash
yarn lint
yarn test
```

### Building and Publishing

- All done via CI Automation
- Do not update package version numbers in `package.json`. Lerna does this through our CI workflow.
- Simply make a feature branch, and once it is approved and merged to master it will publish
