/**
 * Shared tsup configuration for every package in the monorepo.
 *
 * Output layout matches what dts-cli used to publish so consumers (dx, dx-server) keep working:
 *   dist/index.js        CommonJS entry  ("main")
 *   dist/<name>.esm.js   ES module entry ("module")
 *   dist/index.d.ts      per-file types  ("typings"), emitted by tsc -p tsconfig.build.json
 */
export const createConfig = (name, options = {}) => ({
  entry: { index: 'src/index.ts' },
  format: ['cjs', 'esm'],
  outExtension: ({ format }) => ({ js: format === 'esm' ? `.esm.js` : '.js' }),
  esbuildOptions: (esbuild, { format }) => {
    if (format === 'esm') esbuild.entryNames = name;
  },
  dts: false, // declarations are emitted per-file by tsc (see tsconfig.build.json) to keep the published type shape
  sourcemap: true,
  clean: true,
  target: 'es2020',
  platform: 'browser',
  ...options,
});
