export const server = {
  WP_API_USERNAME: process.env.WP_API_USERNAME,
  WP_API_PASSWORD: process.env.WP_API_PASSWORD,
  DEFAULT_REVALIDATE_TIME: Number(process.env.DEFAULT_REVALIDATE_TIME ?? 3600),
  LONG_REVALIDATE_TIME: Number(process.env.LONG_REVALIDATE_TIME ?? 3600 * 24),
};

export const shared = {
  WP_API_DOMAIN: process.env.NEXT_PUBLIC_WP_API_DOMAIN,
};
