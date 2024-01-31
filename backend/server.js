const express = require('express');

const app = express();

app.use(express.json());

app.get('/api/planets', (req, res) => {
    res.json({'it':'works'});
});

const port = 3500;
app.listen(port, ()=>console.log(`server running on port ${3500}`));