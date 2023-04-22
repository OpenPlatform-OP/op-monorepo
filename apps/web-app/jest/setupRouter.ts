jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: () => null,
  })),
}));

export {};
