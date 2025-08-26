import { GET, HEAD } from '@/app/api/health/route';
import { NextRequest } from 'next/server';

// Mock process.uptime
jest.mock('process', () => ({
  uptime: jest.fn(() => 3600),
  env: {
    NODE_ENV: 'test',
  },
}));

describe('/api/health', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/health', () => {
    it('should return healthy status with correct structure', async () => {
      const request = new NextRequest('http://localhost:3000/api/health');
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('status', 'healthy');
      expect(data).toHaveProperty('timestamp');
      expect(data).toHaveProperty('uptime', 3600);
      expect(data).toHaveProperty('environment', 'test');
      expect(data).toHaveProperty('version');
      expect(data).toHaveProperty('services');
      expect(data.services).toHaveProperty('api', 'operational');
      expect(data.services).toHaveProperty('weather', 'operational');
    });

    it('should return valid ISO timestamp', async () => {
      const response = await GET();
      const data = await response.json();

      expect(data.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
      
      // Should be a recent timestamp (within last minute)
      const timestampDate = new Date(data.timestamp);
      const now = new Date();
      const diffInSeconds = (now.getTime() - timestampDate.getTime()) / 1000;
      expect(diffInSeconds).toBeLessThan(60);
    });

    it('should handle errors gracefully', async () => {
      // Mock process.uptime to throw error
      const mockUptime = jest.spyOn(process, 'uptime');
      mockUptime.mockImplementation(() => {
        throw new Error('Process error');
      });

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(503);
      expect(data).toHaveProperty('status', 'unhealthy');
      expect(data).toHaveProperty('timestamp');
      expect(data).toHaveProperty('error', 'Process error');
      expect(data).toHaveProperty('environment', 'test');

      mockUptime.mockRestore();
    });

    it('should include correct version information', async () => {
      const response = await GET();
      const data = await response.json();

      expect(data.version).toBe('1.0.0');
    });
  });

  describe('HEAD /api/health', () => {
    it('should return 200 status for HEAD requests', async () => {
      const response = await HEAD();

      expect(response.status).toBe(200);
      expect(response.body).toBe(null);
    });
  });

  describe('Health check validation', () => {
    it('should include all required health indicators', async () => {
      const response = await GET();
      const data = await response.json();

      // Required fields for health checks
      const requiredFields = [
        'status',
        'timestamp', 
        'uptime',
        'environment',
        'version',
        'services'
      ];

      requiredFields.forEach(field => {
        expect(data).toHaveProperty(field);
      });
    });

    it('should have correct service statuses', async () => {
      const response = await GET();
      const data = await response.json();

      expect(data.services.api).toBe('operational');
      expect(data.services.weather).toBe('operational');
    });
  });
});