import React, { ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a custom render function that includes providers
const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  wrapper?: React.ComponentType<{ children: React.ReactNode }>;
}

const customRender = (
  ui: ReactElement,
  options?: CustomRenderOptions
): RenderResult => {
  return render(ui, {
    wrapper: options?.wrapper || AllTheProviders,
    ...options,
  });
};

// Mock implementations
export const mockWeatherData = {
  location: {
    name: 'London',
    country: 'UK',
    lat: 51.5074,
    lon: -0.1278,
  },
  current: {
    temperature: 22,
    feelsLike: 24,
    humidity: 65,
    windSpeed: 15,
    windDirection: 'SW',
    pressure: 1013,
    visibility: 10,
    uvIndex: 5,
    condition: 'Partly cloudy',
    icon: '02d',
  },
  forecast: {
    daily: [
      {
        date: '2025-01-15',
        high: 25,
        low: 18,
        condition: 'Sunny',
        icon: '01d',
        humidity: 60,
        windSpeed: 10,
      },
    ],
    hourly: [
      {
        time: '2025-01-15T14:00:00Z',
        temperature: 23,
        condition: 'Partly cloudy',
        icon: '02d',
      },
    ],
  },
};

// Mock fetch responses
export const mockFetch = {
  success: (data: any) => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(data),
      })
    ) as jest.Mock;
  },
  
  error: (status = 500, message = 'Server Error') => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status,
        json: () => Promise.resolve({ error: message }),
      })
    ) as jest.Mock;
  },
  
  networkError: () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network Error'))
    ) as jest.Mock;
  },
};

// Test utilities
export const waitForApiCall = () => new Promise(resolve => setTimeout(resolve, 0));

export const createMockGeolocation = () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
    clearWatch: jest.fn(),
  };
  
  Object.defineProperty(global.navigator, 'geolocation', {
    value: mockGeolocation,
    writable: true,
  });
  
  return mockGeolocation;
};

export const mockLocalStorage = () => {
  const store: Record<string, string> = {};
  
  const mockStorage = {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      Object.keys(store).forEach(key => delete store[key]);
    }),
  };
  
  Object.defineProperty(window, 'localStorage', {
    value: mockStorage,
  });
  
  return mockStorage;
};

// Custom matchers
export const customMatchers = {
  toBeValidDate: (received: any) => {
    const pass = received instanceof Date && !isNaN(received.getTime());
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}be a valid date`,
      pass,
    };
  },
  
  toBeWithinRange: (received: number, min: number, max: number) => {
    const pass = received >= min && received <= max;
    return {
      message: () =>
        `expected ${received} to ${pass ? 'not ' : ''}be within range ${min}-${max}`,
      pass,
    };
  },
};

// Extend Jest matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeValidDate(): R;
      toBeWithinRange(min: number, max: number): R;
    }
  }
}

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };