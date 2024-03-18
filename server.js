const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('hello world!');
});

app.get('/about', (req, res) => {
    res.status(200).send({name: "amir", age: 21});
})

app.listen(8080, () => {
    console.log('server is running on port 8080...');
});