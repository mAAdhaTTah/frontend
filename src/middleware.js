import { userAgent } from 'next/server';

/**
 * @param {import('next/server').NextRequest} req
 */
export const middleware = req => {
  const { ua } = userAgent(req);

  if (ua.includes('ClaudeBot')) {
    return new Response('Access Denied', {
      status: 401,
    });
  }
};
