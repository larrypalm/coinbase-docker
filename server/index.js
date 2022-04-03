const express = require('express');
const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4000;

app.get('/api', (req, res) => {
    console.log('api called')
    res.json({express: 'users'});
});
  
app.get('/', (req,res) => {
    res.send('App Works !!!!');
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
});
