const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths,
    { prefix: `<rootDir>/${compilerOptions.baseUrl}/` }
  )
}
