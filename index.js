// MAKE requests using https
// HANDLE requests using http


const http = require("node:http");
const { URL } = require("node:url");
require("./envVar")();

const getRouteMap = require("./getRouteMap");



const server = http.createServer((req, res) => {

    req.on("error", (err) => {
        console.log(err);
        res.statusCode(400);
        res.end("bad request");
        return;
    });

    res.on("error", (err) => {
        console.log(err);
    })

    const reqUrl = new URL(req.url, `http://${req.headers.host}`);
    if (req.method == "GET") {
        if (reqUrl.pathname == "/") {
            res.end("server running");
        } else {
            const action = getRouteMap[reqUrl.pathname];
            if (action) { action(reqUrl, res); }
            else {
                res.statusCode = 400;
                res.end("bad req");
            }
        }
    }


}).listen(3000, () => {
    console.log("server listening on port 3000");
})