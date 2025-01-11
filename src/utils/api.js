"use server";
const config = require("@/json/config.json");

export async function fetchEndpoint(headers, endpoint) {
    const data = await fetch(config.baseApiURL + endpoint, { headers });
    const json = await data.json();

    return json;
}