import { NextResponse, userAgent } from 'next/server';

/**
 * @param {import('next/server').NextRequest} req
 */
export const middleware = req => {
  const { ua } = userAgent(req);
  console.log('ua', ua);

  if (ua.includes('ClaudeBot')) {
    return new NextResponse('Access Denied', {
      status: 403,
    });
  }

  return NextResponse.next();
};
