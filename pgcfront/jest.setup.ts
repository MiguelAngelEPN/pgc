import "@testing-library/jest-dom";

jest.mock('next/navigation', () => {
  return {
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
    useSearchParams: () => ({
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
      toString: () => '',
      entries: () => [],
    }),
  };
});
