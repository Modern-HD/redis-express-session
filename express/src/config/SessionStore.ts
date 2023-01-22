import session from 'express-session';
import { createClient } from 'redis';
import connectionRedis, { Client, RedisStore } from 'connect-redis';
import { SessionOptions } from 'express-session';

const RedisStore: RedisStore = connectionRedis(session);

const client: Client = createClient({
    socket: {
        host: '127.0.0.1',
        port: 6379
    },
    legacyMode: true
});

client.connect().then();

const sessionInfo: SessionOptions = {
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET!,
    name: 'user',
    cookie: {
        maxAge: 1000 * 60 * 60 * 6,
        httpOnly: true,
        secure: false
    },
    store: new RedisStore({ client, logErrors: true })
};

export default session(sessionInfo);    