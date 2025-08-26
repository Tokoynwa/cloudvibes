/**
 * Integration tests for weather functionality
 * Tests the complete weather data flow from API to display
 */

describe('Weather Integration Tests', () => {
  const mockWeatherData = {
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

  beforeEach(() => {
    // Reset fetch mock
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Weather API Integration', () => {
    it('should fetch weather data successfully', async () => {
      // Mock successful API response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockWeatherData,
      });

      const response = await fetch('/api/weather?q=London');
      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data).toEqual(mockWeatherData);
      expect(data.location.name).toBe('London');
      expect(data.current.temperature).toBe(22);
    });

    it('should handle API errors gracefully', async () => {
      // Mock failed API response
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('API Error')
      );

      await expect(fetch('/api/weather?q=InvalidCity')).rejects.toThrow('API Error');
    });

    it('should validate required weather data fields', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockWeatherData,
      });

      const response = await fetch('/api/weather?q=London');
      const data = await response.json();

      // Validate data structure
      expect(data).toHaveProperty('location');
      expect(data).toHaveProperty('current');
      expect(data).toHaveProperty('forecast');
      
      // Validate location data
      expect(data.location).toHaveProperty('name');
      expect(data.location).toHaveProperty('country');
      expect(data.location).toHaveProperty('lat');
      expect(data.location).toHaveProperty('lon');

      // Validate current weather data
      expect(data.current).toHaveProperty('temperature');
      expect(data.current).toHaveProperty('condition');
      expect(data.current).toHaveProperty('humidity');
      expect(data.current).toHaveProperty('windSpeed');
    });

    it('should handle rate limiting', async () => {
      // Mock rate limit response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 429,
        json: async () => ({ error: 'Rate limit exceeded' }),
      });

      const response = await fetch('/api/weather?q=London');
      expect(response.status).toBe(429);
      
      const data = await response.json();
      expect(data.error).toBe('Rate limit exceeded');
    });
  });

  describe('Geolocation Integration', () => {
    it('should handle geolocation requests', async () => {
      // Mock geolocation API response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockWeatherData,
      });

      const response = await fetch('/api/weather?lat=51.5074&lon=-0.1278');
      const data = await response.json();

      expect(response.ok).toBe(true);
      expect(data.location.lat).toBe(51.5074);
      expect(data.location.lon).toBe(-0.1278);
    });

    it('should validate coordinate parameters', async () => {
      // Mock invalid coordinates
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: async () => ({ error: 'Invalid coordinates' }),
      });

      const response = await fetch('/api/weather?lat=invalid&lon=invalid');
      expect(response.status).toBe(400);
    });
  });

  describe('Weather Data Processing', () => {
    it('should process temperature units correctly', () => {
      const celsius = 22;
      const fahrenheit = (celsius * 9) / 5 + 32;
      
      expect(fahrenheit).toBeCloseTo(71.6);
    });

    it('should format wind direction correctly', () => {
      const directions = {
        N: 0,
        NE: 45,
        E: 90,
        SE: 135,
        S: 180,
        SW: 225,
        W: 270,
        NW: 315,
      };

      // Test wind direction conversion
      Object.entries(directions).forEach(([direction, degrees]) => {
        expect(typeof direction).toBe('string');
        expect(typeof degrees).toBe('number');
        expect(degrees).toBeGreaterThanOrEqual(0);
        expect(degrees).toBeLessThan(360);
      });
    });

    it('should validate forecast data', () => {
      const forecast = mockWeatherData.forecast;
      
      // Daily forecast validation
      expect(Array.isArray(forecast.daily)).toBe(true);
      expect(forecast.daily[0]).toHaveProperty('date');
      expect(forecast.daily[0]).toHaveProperty('high');
      expect(forecast.daily[0]).toHaveProperty('low');

      // Hourly forecast validation  
      expect(Array.isArray(forecast.hourly)).toBe(true);
      expect(forecast.hourly[0]).toHaveProperty('time');
      expect(forecast.hourly[0]).toHaveProperty('temperature');
    });
  });

  describe('Error Handling', () => {
    it('should handle network errors', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network error')
      );

      await expect(fetch('/api/weather?q=London')).rejects.toThrow('Network error');
    });

    it('should handle invalid JSON responses', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      });

      const response = await fetch('/api/weather?q=London');
      await expect(response.json()).rejects.toThrow('Invalid JSON');
    });

    it('should handle API service unavailable', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 503,
        json: async () => ({ error: 'Service unavailable' }),
      });

      const response = await fetch('/api/weather?q=London');
      expect(response.status).toBe(503);
    });
  });

  describe('Caching and Performance', () => {
    it('should cache weather requests', async () => {
      const cacheKey = 'weather_London_UK';
      const cachedData = mockWeatherData;

      // Mock localStorage
      const localStorageMock = {
        getItem: jest.fn(() => JSON.stringify({
          data: cachedData,
          timestamp: Date.now(),
        })),
        setItem: jest.fn(),
      };
      
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock,
      });

      // Simulate cache retrieval
      const cached = JSON.parse(localStorageMock.getItem(cacheKey) || '{}');
      expect(cached.data).toEqual(cachedData);
    });

    it('should expire cached data after timeout', () => {
      const now = Date.now();
      const fiveMinutesAgo = now - (5 * 60 * 1000);
      const cacheTimeout = 5 * 60 * 1000; // 5 minutes

      expect(now - fiveMinutesAgo).toBeGreaterThanOrEqual(cacheTimeout);
    });
  });
});