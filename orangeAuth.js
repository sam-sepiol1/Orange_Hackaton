import dotenv from 'dotenv';
dotenv.config();

let toRefresh = true;
let timerID = false;
let token;

async function fetchOrangeToken() {
    try {
        const response = await fetch('https://api.orange.com/oauth/v3/token', {
            method: 'POST',
            headers: {
                'Authorization': process.env.ORANGE_KEY,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
            body: new URLSearchParams({
                'grant_type': 'client_credentials'
            })
        });
        if (!response.ok) {
            throw new Error(`not daijoubu: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching token:', error);
    }
}
 
function refreshIn(){
    if(!timerID)
        clearTimeout(timerID)
    timerID = setTimeout(() => {
        toRefresh = true;
      }, "3500 second");
    return timerID;
}

async function getOrangeToken(){
    if(toRefresh){
        token = await fetchOrangeToken();
        toRefresh = false;
        timerID = refreshIn();
    }
    return token
}

getOrangeToken();

export default getOrangeToken;