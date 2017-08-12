const os = require('os');
const http = require('http');
const port = 8765;

exports.onclick = function () { };

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    switch (req.url) {
        case '/click':
            exports.onclick();
            res.end('0');

            break;
        case "/auth":
            res.end('1');

            break;
        default:
            res.statusCode = 404;
            res.end('404 not found')
            break;
    }
});
exports.start = (cb) => {

    server.listen(port, (e) => {
        cb(e);
    });
};
exports.stop = (cb) => {
    server.close(() => {
        cb();
    })
};
exports.getIP = () => {
    var ret='';
    var ifaces = os.networkInterfaces();

    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;

        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }
            ret = iface.address;
        });
    });
    return ret;
}