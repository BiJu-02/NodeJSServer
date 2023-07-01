const https = require("node:https");
require("./envVar")();

const options = {
    hostname: "api.twitter.com",
    path: `/2/users/by/username/chris`,
    method: "GET",
    headers: {
        "Authorization": `Bearer ${process.env.TWITTER_BEARER}`
    }
}
const req = https.request(options, (res) => {
    let reqBody = ""
    res.on("data", (chunk) => { reqBody += chunk; })
    res.on("end", () => {
        console.log(reqBody);
    })
});

req.on("error", (err) => {
    console.error(err);
});

req.end();