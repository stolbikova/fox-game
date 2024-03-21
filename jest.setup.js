import "@testing-library/jest-dom";

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'), // Preserve other functionalities
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(() => Promise.resolve(true)),
      }),
  }));