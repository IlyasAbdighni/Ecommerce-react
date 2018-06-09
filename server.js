const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.get('/', (req, res) => {
    res.send('Let us begin!')
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

