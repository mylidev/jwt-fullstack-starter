/**
 * jwts.ts
 */

export default {
    Request: {
        SECRET: 'request-jwt-secret',
        DOMAIN: 'request',
        EXPIRATION: '10m'
    },
    Refresh: {
        SECRET: 'refresh-jwt-secret',
        DOMAIN: 'refresh',
        EXPIRATION: '1d'
    },
    Restore: {
        SECRET: 'restore-jwt-secret',
        DOMAIN: 'restore',
        EXPIRATION: 365 * 24 * 3600000
    }
};
