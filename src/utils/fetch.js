/**
 * 
 * @param { String } url 
 * @returns { Object }
 */

exports.fetchJSON = async (url) => {
    let response = await fetch(url);
    let body = await response.json();
    return body;
}
  
/**
 * 
 * @param { String } url 
 * @returns { String }
 */

exports.fetchRAW = async (url) => {
    let response = await fetch(url);
    let body = await response.text();
    return body;
}