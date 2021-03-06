const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    /*app.use(proxy('/auth/google',
        { target: 'http://localhost:5000/' }
    ));
    app.use(proxy('/auth/*',
        { target: 'http://localhost:5000/' }
    ));*/
    app.use(proxy('/api/*',
        { target: 'https://techskoop.com',
            "secure": false,
            "changeOrigin": true }
    ));
    /*app.use(proxy('/api/reactions/*',
        { target: 'http://localhost:5000' }
    ));
    app.use(proxy('/api/products/*',
        { target: 'http://localhost:5000' }
    ));
    app.use(proxy('/api/profile/*',
        { target: 'http://localhost:5000' }
    ));*/
};