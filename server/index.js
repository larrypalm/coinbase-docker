const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.send('hello world!!!asd');
});

app.listen(4000);

console.log('listening on 4000')