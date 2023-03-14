/**
 * cors.ts
 */

const whitelist = ['https://fullstack.myli.dev'];

export default {
    origin: (
        origin: string | undefined,
        callback: (err: Error | null, allow?: boolean) => void
    ): void => {
        if (!origin) {
            return callback(null, true);
        }
        if (!whitelist.includes(origin)) {
            const message = `CORS header 'Access-Control-Allow-Origin' does not match '${origin}'`;
            return callback(new Error(message), false);
        }
        return callback(null, true);
    },
    credentials: true
};
