/**
 * strings.ts
 */

/* eslint-disable @typescript-eslint/explicit-function-return-type */

export const APP_NAME = 'Full Stack Server';

export const DATABASE_URI = 'MONGODB_URI';

export const systemMessages = {
    client: {},
    server: {
        GENERATE_STRATEGY: (strategy: string) =>
            `Generating JWT authentication strategy with identifier '${strategy}'.`,
        INITIALIZE_EXPRESS: 'Initializing the Express application instance...',
        MOUNT_MIDDLEWARES:
            'Mounting middlewares on Express application instance...',
        MOUNT_ROUTERS: 'Mounting routers on Express application instance...',
        EXPRESS_STARTING: (name: string, port: number) =>
            `Attempting to start ${name} on port ${port}.`,
        EXPRESS_STARTED: (name: string, port: number) =>
            `Successfully started ${name} on port ${port}.`,
        MONGOOSE_CONNECTING: (uri: string) =>
            `Attempting to establish connection to MongoDB on ${uri}.`,
        MONGODB_CONNECTED: (uri: string) =>
            `Successfully estalished connection to MongoDB on ${uri}.`,
        MONGODB_DISCONNECTED: (uri: string) =>
            `Terminated connection to MongoDB on ${uri}.`,
        VALIDATING_REQUEST_BODY: (body: unknown) =>
            `Attempting to validate HTTP request with body: ${body}`
    }
};

export const accountMessages = {
    client: {
        SIGNED_OUT: 'Successfully signed out.',
        CHECKED_RESET_TOKEN: 'Successfully validated the password reset token.',
        RESET_PASSWORD_EMAIL_SENT:
            'Successfully sent E-mail with password reset link.',
        RESETTED_PASSWORD:
            'Successfully resetted password using password reset link.'
    },
    server: {
        GETTING_ACCOUNT_DETAILS: (id: string) =>
            `Getting account details for account with ID: ${id}`,
        UPDATING_ACCOUNT_DETAILS: (id: string) =>
            `Attempting to update account details for account with ID: ${id}`,
        UPDATING_EMAIL: (id: string) =>
            `Attempting to update email for account with ID: ${id}`,
        UPDATING_PASSWORD: (id: string) =>
            `Attempting to update password for account with ID: ${id}`,
        DELETING_ACCOUNT: (id: string) =>
            `Attempting to delete account with ID: ${id}`,
        REFRESHING_JWTS: (id: string) =>
            `Refreshing JWTs for account with ID: ${id}.`,
        RESTORING_JWTS: (id: string) =>
            `Restoring JWTs for account with ID: ${id}.`,
        SIGNING_UP: (email: string) =>
            `Attempting to sign up account with E-mail: ${email}.`,
        SIGNING_IN: (email: string) =>
            `Attempting to sign in account with E-mail: ${email}.`,
        SIGNING_OUT: (ip: unknown) =>
            `Attempting to sign out client with IP address: ${ip}.`,
        SENDING_RESET_EMAIL: (email: string) =>
            `Attempting to send password reset E-mail for account with email: ${email}`,
        RESETTING_PASSWORD: (id: string, ip: string) =>
            `Attempting to reset password for account with ID: ${id} from IP: ${ip}`,
        SAVING_UNMODIFIED: (id: string) =>
            `Attempting to save account with ID: ${id} without modifying password.`,
        SAVING_MODIFIED: (id: string) =>
            `Attempting to save account with ID: ${id} with password modified.`,
        VALIDATING_PASSWORD: (id: string) =>
            `Validating password for account with ID: ${id}`,
        VERIFYING_SIGNATURE: (id: string) =>
            `Verifying signature for account with ID: ${id}`,
        GENERATING_JWTS: (number: number, id: string) =>
            `Generating ${number} JWT(s) for account with ID: ${id}`,
        GENERATEJWTTOKENS_ERROR:
            "Account method 'generateJwtTokens()' is executed with incorrect parameters!"
    }
};

export const workspaceMessages = {
    client: {},
    server: {}
};
