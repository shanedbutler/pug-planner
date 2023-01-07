const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/game",
    "/position",
    "/pronoun",
    "/roster",
    "/user"
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7066',
        secure: false
    });

    app.use(appProxy);
};
