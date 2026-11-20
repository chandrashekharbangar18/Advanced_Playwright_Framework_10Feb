import { test, expect, request } from '@playwright/test';

test('@smoke newContext for isolated headers', async () => {
  const ctx = await request.newContext({
    baseURL: 'https://gorest.co.in',
    extraHTTPHeaders: { 'X-Trace-Id': 'demo-123' },
    timeout: 15_000,
  });

  try {
    const response = await ctx.get('/public/v2/users?page=1&per_page=1');
    expect(response.status()).toBe(200);
  } finally {
    await ctx.dispose();
  }
});
