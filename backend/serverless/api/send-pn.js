const { JWT } = require('google-auth-library');

function getAccessTokenAsync() {
    return new Promise((resolve, reject) => {
        const jwtClient = new JWT(
            process.env.CLIENT_EMAIL,
            null,
            process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
            ['https://www.googleapis.com/auth/cloud-platform'],
            null
        );
        jwtClient.authorize((err, tokens) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(tokens.access_token);
        });
    });
}

async function sendFCMv1Notification(firebaseAccessToken, deviceToken, FCM_PROJECT_NAME, { body, title, message, channelId, scopeKey, experienceId }) {
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

    const json = await response.json();
    return json;
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send({ error: 'Method not allowed' });
    }

    try {
        const token = await getAccessTokenAsync();
        const data = await sendFCMv1Notification(token, req.body.to, "emvee-resturant", {
            channelId: req.body.channelId,
            message: req.body.message,
            title: req.body.title,
            body: JSON.stringify(req.body.body),
            scopeKey: req.body.scopeKey,
            experienceId: req.body.experienceId,
        });
        return res.status(200).send({ message: "Server is Working!", data });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}
