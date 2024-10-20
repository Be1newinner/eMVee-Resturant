const express = require("express")
const { JWT } = require('google-auth-library');
const service = require("./service.json")
const app = express()

app.use(express.json())

function getAccessTokenAsync(
    key
) {
    return new Promise(function (resolve, reject) {
        const jwtClient = new JWT(
            key.client_email,
            null,
            key.private_key,
            ['https://www.googleapis.com/auth/cloud-platform'],
            null
        );
        jwtClient.authorize(function (err, tokens) {
            if (err) {
                reject(err);
                return;
            }
            resolve(tokens.access_token);
        });
    });
}

async function sendFCMv1Notification(firebaseAccessToken, deviceToken, FCM_PROJECT_NAME, { body, title, message, channelId, scopeKey, experienceId }) {
    // const firebaseAccessToken = await getAccessTokenAsync(key);

    const messageBody = {
        message: {
            token: deviceToken,
            notification: {
                title,
                body: message,
            },
            data: {
                channelId,
                message: body,
                scopeKey,
                experienceId,
            },
        },
    };

    const response = await fetch(
        `https://fcm.googleapis.com/v1/projects/${FCM_PROJECT_NAME}/messages:send`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${firebaseAccessToken}`,
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageBody),
        }
    );

    const readResponse = (response) => response.json();
    const json = await readResponse(response);

    console.log(`Response JSON: ${JSON.stringify(json, null, 2)}`);
    return json;
}

app.all("/", async (req, res) => {
    res.status(200).send({ message: "It's a wonderful day!" })
})

app.post("/send-notification", async (req, res) => {
    try {
        const token = await getAccessTokenAsync(service);
        const data = await sendFCMv1Notification(token, req.body.to, "emvee-resturant", {
            channelId: req.body.channelId,
            message: req.body.message,
            title: req.body.title,
            body: JSON.stringify(req.body.body),
            scopeKey: req.body.scopeKey,
            experienceId: req.body.experienceId,
        });
        res.status(200).send({ message: "Server is Working!", data })
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})

app.listen(3000, () => {
    console.log("Started on PORT 3000")
})