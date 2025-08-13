import { RateLimiterMemory } from "rate-limiter-flexible";

export const rateLimiter = new RateLimiterMemory({
    points: 2,
    duration: 15
})