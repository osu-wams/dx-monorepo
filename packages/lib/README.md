### Jest

Jest tests are set up to run with `npm test` or `yarn test`. This runs the test watcher (Jest) in an interactive mode. By default, runs tests related to files changed since the last commit.

#### Typescript configuration

Base configuration for Typescript are extended from the root folders `tsconfig.json` file and are intended to be fairly strict to en(force/courage) higher quality code standards.

## Optimizations

A handy development optimization exists to provide a global boolean `__DEV__` to target debugging code only in the development environment.

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
  console.log('foo');
}
```
