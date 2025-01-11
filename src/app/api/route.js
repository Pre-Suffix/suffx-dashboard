const config = require("@/json/config.json");

/**
 * 
 * @param { Request } request 
 */

export async function POST(request) {
    try {
        fetch(config.baseApiURL + (await request.text()), { headers: {
            cookie: request.headers.get("cookie")
        }});
    
        return Response.json({ msg: "Request successful." });
    } catch (error) {
        return Response.json({ msg: "An error occured." });
    }
}