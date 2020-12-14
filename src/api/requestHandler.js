const fetch = require('node-fetch')

const key = '7DMOgxCtMFrNB8aeJpi6tDFZ5hp4pOcp'
const url = 'https://api.polygon.io'

async function requestHandler(uri) {
    return await fetch(
        `${url}${uri}apiKey=${key}`,
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => error);
}

module.exports = requestHandler