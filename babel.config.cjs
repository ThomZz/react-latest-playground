// Babel is used only by Jest to transform TS/JSX into CommonJS.
// Presets are gated behind the "test" env so this file never affects
// Vite's dev/build pipeline (which has its own React/Babel handling).
module.exports = (api) => {
  const isTest = api.env('test');
  return {
    presets: isTest
      ? [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          ['@babel/preset-react', { runtime: 'automatic' }],
          '@babel/preset-typescript'
        ]
      : []
  };
};
