import type { Config } from 'jest';

const config: Config = {
  displayName: 'web-app',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/next/babel'] }],
  },
  setupFilesAfterEnv: ['<rootDir>/jest/setupRouter.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

export default config;
