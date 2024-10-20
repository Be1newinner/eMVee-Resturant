const express = require("express")
const { JWT } = require('google-auth-library');
const service = require("./service.json")
const app = express()


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

app.all("/", async (req, res) => {
    res.status(200).send({ message: "It's a wonderful day!" })
})

app.all("/get-token", async (req, res) => {
    try {
        const data = await getAccessTokenAsync(service);
        res.status(200).send({ token: data, message: "Token generation success!" })
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})


app.listen(3000, () => {
    console.log("Started on PORT 3000")
})