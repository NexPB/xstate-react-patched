import { readFileSync } from 'node:fs';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

const makeExternalPredicate = (externalArr) => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);
  return (id) => pattern.test(id);
};

function createUmdConfig({ input, output: file, name }) {
  return {
    input,
    external: makeExternalPredicate(Object.keys(pkg.peerDependencies)),
    output: {
      file,
      format: 'umd',
      name,
      globals: {
        react: 'React',
        xstate: 'XState',
        '@xstate/fsm': 'XStateFSM'
      }
    },
    plugins: [
      nodeResolve({
        browser: true
      }),
      commonjs(),
      replace({
        preventAssignment: true,
        values: { 'process.env.NODE_ENV': JSON.stringify('production') }
      }),
      typescript({
        compilerOptions: {
          declaration: false,
          declarationMap: false,
          module: 'ES2015',
          outDir: './dist'
        }
      }),
      terser()
    ]
  };
}

export default [
  createUmdConfig({
    name: 'XStateReact',
    input: 'src/index.ts',
    output: 'dist/xstate-react.umd.min.js'
  }),
  createUmdConfig({
    name: 'XStateReactFSM',
    input: 'src/fsm.ts',
    output: 'dist/xstate-react-fsm.umd.min.js'
  })
];
