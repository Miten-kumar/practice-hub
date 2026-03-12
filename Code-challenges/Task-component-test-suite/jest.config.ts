import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Use ts-jest for TypeScript support
  testEnvironment: 'jsdom', // Or 'jsdom' for browser environments
  // You can add more configuration options here
};

export default config;
