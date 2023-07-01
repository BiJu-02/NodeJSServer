module.exports = (reqUrl, res) => {
    const https = require("node:https");

    if (reqUrl.searchParams.has("userName")) {
        const userName = reqUrl.searchParams.get("userName");
        const options = {
            hostname: "api.twitter.com",
            path: `/2/users/by/username/${userName}?user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,url,username,verified,withheld`,
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.TWITTER_BEARER}`
            }
        }
    
        const req = https.request(options, (twRes) => {
            let reqBody = "";
            twRes.on("data", (chunk) => { reqBody += chunk; });
            twRes.on("end", () => {
                const userData = JSON.parse(reqBody).data;
                console.log(userData.id);
                res.end(reqBody);
            })
        });
        req.on("error", (err) => {
            console.log(err);
            res.end(JSON.stringify({err: "twitter req ded"}));
        });
        req.end();
        
    } else {
        res.end(JSON.stringify({err: "eh"}));
    }


}