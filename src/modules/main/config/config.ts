export default () => ({
    rateLimiter: {
        allowMaxRequests: process.env.ALLOW_MAX_REQUESTS,
        timeWindowBetweenRequests: process.env.RATE_LIMITER_TIME_WINDOW,
    }
});