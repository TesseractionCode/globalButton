const express = require('express');

const app = express();
app.use(express.static(__dirname + '/public'));
// Make the server parse json formatted requests automatically
app.use(express.json());

let global_clicks = 0;

app.get("/", (req, res) => {
    res.sendFile("views/index.html", {root: __dirname});
});

app.get("/num_clicks", (req, res) => {
    //res.send(JSON.stringify({amount: global_clicks}));
    res.json({amount: global_clicks})
});

app.post("/increase_clicks", (req, res) => {
    let amount = req.body.amount;
    global_clicks += amount;
    console.log(global_clicks);
    res.send("success");
});

app.listen(8000);