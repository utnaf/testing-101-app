const tsconfig = require('./tsconfig.json');

module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  rootDir: './',
  testURL: 'http://localhost/',
  coverageDirectory: '<rootDir>/docs/test-results/',
  testMatch: ['<rootDir>/src/**/*.spec.tsx'],
  moduleNameMapper: mapTypescriptAliasToJestAlias({
    '\\.(css|scss)$': 'identity-obj-proxy',
  }),
  setupFiles: ['<rootDir>/enzyme-setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
  reporters: ['default'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
};

function mapTypescriptAliasToJestAlias(alias = {}) {
  const jestAliases = { ...alias };
  if (!tsconfig.compilerOptions.paths) {
    return jestAliases;
  }
  Object.entries(tsconfig.compilerOptions.paths)
    .filter(([key, value]) => {
      // use Typescript alias in Jest only if this has value
      if (value.length) {
        return true;
      }
      return false;
    })
    .map(([key, value]) => {
      // if Typescript alias ends with /* then in Jest:
      // - alias key must end with /(.*)
      // - alias value must end with /$1
      const regexToReplace = /(.*)\/\*$/;
      const aliasKey = key.replace(regexToReplace, '$1/(.*)');
      const aliasValue = value[0].replace(regexToReplace, '$1/$$1');
      return [aliasKey, `<rootDir>/${aliasValue}`];
    })
    .reduce((aliases, [key, value]) => {
      aliases[key] = value;
      return aliases;
    }, jestAliases);
  return jestAliases;
}
