const express = require('express');
const cors = require('cors');
const axios = require('axios');
const qs = require('qs');
require('dotenv').config();

const app = express();

app.use(cors());

let accessToken = "";
let refreshToken = "";

const generateRandomString = (length = 6) => {
	const string = Math.random().toString(20).substr(2, length);

	return string;
}

const secret = generateRandomString();

const PORT = process.env.PORT || 4000;

app.post('/callback', async (req, res) => {
    if (secret === req.query.secret) {
        const data = qs.stringify({ 
            'grant_type': 'authorization_code', 
            'code': `${req.query.code}`, 
            'client_id': '3ee32fd93a9eeb7ee38d1f5ccc804b498cc336bdee838f996c22c77c9996be0b', 
            'client_secret': '1cab96b5b5b967cae66bbdae8c23c21851de28ce3c75d567ed35eed5237b0eb5', 
            'redirect_uri': 'http://localhost:3000/callback' 
        }); 
        const config = { 
            method: 'post', 
            url: 'https://api.coinbase.com/oauth/token', 
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded' 
            }, 
            data 
        };
    
        try { 
            const response = await axios(config); 
            // saving tokens for other requests
            accessToken = response.data.access_token;
            refreshToken = response.data.refresh_token;
            res.send({ response: response?.data }); 
        } catch (e) { 
            console.error("Could not trade code for tokens", e) 
        } 

    
        res.json({ query: req.query });
    } else {
        console.log('not')
    }

});

app.get('/secrets', (req, res) => {
    res.send({ 
        secret,
        client_id: `${process.env.COINBASE_CLIENT_ID}`,
        redirect_uri: `${process.env.COINBASE_REDIRECT_URL}`,
        coinbase_url: 'https://www.coinbase.com/oauth/authorize'
    });
});

app.get('/api', (req, res) => {
    console.log('api called')
    res.json({ express: 'users' });
});
  
app.get('/', (req,res) => {
    res.send('App Works !!!!');
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});
