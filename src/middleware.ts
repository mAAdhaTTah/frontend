import { NextResponse, userAgent } from 'next/server';

/**
 * @param {import('next/server').NextRequest} req
 */
export const middleware = (req: any) => {
  const { ua } = userAgent(req);

  if (ua.includes('ClaudeBot')) {
    return new NextResponse('Access Denied', {
      status: 403,
    });
  }

  return NextResponse.next();
};
