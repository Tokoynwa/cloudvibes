import { test, expect } from '@playwright/test';

test.describe('Health Check API', () => {
  test('should return healthy status', async ({ request }) => {
    const response = await request.get('/api/health');
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.status).toBe('healthy');
    expect(data).toHaveProperty('timestamp');
    expect(data).toHaveProperty('uptime');
    expect(data).toHaveProperty('version');
    expect(data).toHaveProperty('services');
    expect(data.services.api).toBe('operational');
    expect(data.services.weather).toBe('operational');
  });

  test('should respond to HEAD requests', async ({ request }) => {
    const response = await request.head('/api/health');
    expect(response.status()).toBe(200);
  });

  test('should have reasonable response time', async ({ request }) => {
    const startTime = Date.now();
    const response = await request.get('/api/health');
    const endTime = Date.now();
    
    expect(response.status()).toBe(200);
    expect(endTime - startTime).toBeLessThan(1000); // Should respond within 1 second
  });

  test('should return consistent data structure', async ({ request }) => {
    // Make multiple requests to ensure consistency
    for (let i = 0; i < 3; i++) {
      const response = await request.get('/api/health');
      const data = await response.json();
      
      // Check required fields are always present
      expect(data).toHaveProperty('status');
      expect(data).toHaveProperty('timestamp');
      expect(data).toHaveProperty('uptime');
      expect(data).toHaveProperty('environment');
      expect(data).toHaveProperty('version');
      expect(data).toHaveProperty('services');
      
      // Status should always be healthy in test environment
      expect(data.status).toBe('healthy');
    }
  });
});