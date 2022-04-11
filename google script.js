const POST_URL = "PUT YOUR WEBHOOK URL HERE";

function onSubmit(e) {
    const response = e.response.getItemResponses();
    let items = [];

    for (const responseAnswer of response) {
        const question = responseAnswer.getItem().getTitle();
        const answer = responseAnswer.getResponse();
        let parts = []

        try {
            parts = answer.match(/[\s\S]{1,1024}/g) || [];
        } catch (e) {
            parts = answer;
        }

        if (!answer) {
            continue;
        }

        for (const [index, part] of Object.entries(parts)) {
            if (index == 0) {
                items.push({
                    "name": question,
                    "value": part,
                    "inline": false
                });
            } else {
                items.push({
                    "name": question.concat(" (cont.)"),
                    "value": part,
                    "inline": false
                });
            }
        }
    }

    const options = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "payload": JSON.stringify({
            "embeds": [{
                "title": "New reply to the Storage Upgrades form!", // Change this if you want to change the main title of the embed
                "color": 1691354, // This is optional, you can look for decimal colour codes at https://www.webtoolkitonline.com/hexadecimal-decimal-color-converter.html
                "fields": items,
                 "footer": {
                    "text": "Made by Iku and improved by RooRay and others" // Change this to change the footer before the timestamp
                },
                "timestamp": new Date().toISOString()
            }]
        })
    };

    UrlFetchApp.fetch(POST_URL, options);
};
