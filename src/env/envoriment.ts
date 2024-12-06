export const nestjsPort = process.env.PORT || 3000;

export const isProd = process.env.NODE_ENV === 'production';

export const discordFailureUrl = process.env.DISCORD_FAILURE_URL;
export const discordSuccessUrl = process.env.DISCORD_SUCCESS_URL;

export const jwtSecret = process.env.JWT_SECRET || 'secret';

export const superAdminSeedPassword = process.env.SUPER_ADMIN_PASSWORD ;
export const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
export const superAdminName = process.env.SUPER_ADMIN_NAME;
