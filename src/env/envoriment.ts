export const nestjsPort = process.env.PORT || 3000;
export const isProd = process.env.NODE_ENV === 'production'
export const discordFailureUrl = process.env.DISCORD_FAILURE_URL
export const discordSuccessUrl = process.env.DISCORD_SUCCESS_URL