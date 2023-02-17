const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

// Add target const
const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:54955';

const context = [
    "/game",
    "/position",
    "/pronoun",
    "/roster",
    "/user",
    "/swagger"
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: target,
        secure: false,
        headers: {
            Connection: 'Keep-Alive'
        }
    });

    app.use(appProxy);
};

// Pre refactor-method
//module.exports = function (app) {
//    const appProxy = createProxyMiddleware(context, {
//        target: 'https://localhost:7066',
//        secure: false
//    });

//    app.use(appProxy);
//};
