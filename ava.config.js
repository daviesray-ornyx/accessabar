const config = {
  files: ['tests/ava/**/*.ts'],
  sources: ['src/**/*.ts'],
  extensions: ['ts'],
  compileEnhancements: true,
  cache: true,
  require: ['ts-node/register'],
};

export default config;
