import { Config } from 'jest';

const config: Config = {
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',  // Use ts-jest for TypeScript files
  },
  moduleFileExtensions: ['js', 'json', 'ts'],  // Extensions Jest will recognize
  testRegex: '.*\\.spec\\.ts$',  // Run test files with .spec.ts extension
  rootDir: 'src',  // Source and test files are in the src folder
  testEnvironment: 'node',  // Node.js environment for testing
  collectCoverage: true,  // Collect coverage info
  coverageDirectory: '../coverage',  // Output coverage report to coverage folder
  coverageProvider: 'v8',  // Use V8 coverage provider for faster reporting
};

export default config;
