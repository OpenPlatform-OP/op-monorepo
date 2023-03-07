import { Config } from 'jest';

const config: Config = {
  displayName: 'blog-api',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/blog-api',
  collectCoverageFrom: ['**/*.ts', '!**/environments/*.ts'],
};

export default config;
