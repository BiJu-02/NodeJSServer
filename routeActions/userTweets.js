module.exports = (reqUrl, res) => {
    const https = require("node:https");

    const options = {
        hostname: "api.twitter.com",
        path: "",
        method: "GET",
        headers: {
            "Authorization": `Bearer ${process.env.TWITTER_BEARER}`
        }
    }

    // vars and funcs, callbacks
    let userId = "";
    let maxRes = 20;

    const tlResCB = (tlRes) => {
        let reqBody = "";
        tlRes.on("data", (chunk) => { reqBody += chunk; });
        tlRes.on("end", () => {
            const userTimeline = JSON.parse(reqBody);
            console.log(userTimeline);
            res.end(reqBody);
            // if (userTimeline.result_count < 1) {
            // } else {
            //     const reqForTimeline = https.request(options, tlResCB);
            //     reqForTimeline.on("error", (err) => {
            //         res.end(JSON.stringify({err: "twitter req 2 ded"}))
            //     })
            //     reqForTimeline.end() 
                
            // }
        });
    }

    const idResCB = (idRes) => {
        let reqBody = "";
        idRes.on("data", (chunk) => { reqBody += chunk; });
        idRes.on("end", () => {
            const userData = JSON.parse(reqBody).data;
            userId = userData.id;
            console.log(userId);
            options.path = `/2/users/${userId}/tweets`
            const reqForTimeline = https.request(options, tlResCB);
            reqForTimeline.on("error", (err) => {
                res.end(JSON.stringify({err: "twitter req 2 ded"}))
            })
            reqForTimeline.end();
        });
    }

    
    // logic starts
    if (!reqUrl.searchParams.has("userName")) {
        res.end(JSON.stringify({"err": "incorrect parameters"}));
        return;
    }

    const userName = reqUrl.searchParams.get("userName");
    options.path = `/2/users/by/username/${userName}`;
    console.log("ehr")
    const reqForUser = https.request(options, idResCB);
    reqForUser.on("error", (err) => {
        console.log(err);
        res.end(JSON.stringify({err: "twitter req 1 ded"}));
    });
    reqForUser.end();
    
}