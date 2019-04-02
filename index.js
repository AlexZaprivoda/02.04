var express = require('express')
var cors = require('cors')
const bodyParser = require("body-parser");
var app = express()

app.use(cors())
app.use(bodyParser.json());

app.use(express.static("./public"));

let USERS = [];
app.post("/reg", (req, res) => {
    console.log(req.body);
    const userName = req.body.name;

    if (USERS.some((user) => user.name === userName)) {
        res.json({
            response: false
        });
    } else {
        USERS.push({
            name: userName,
            response: null
        });
        res.json({
            response: true
        });
        console.log(USERS);
    }
});

app.post("/msg", (req, res) => {
    const message = req.body.message;


});

app.get("/conn/:userName", (req, res) => {
    const { userName } = req.params;

    for (let i = 0; i < USERS.length; i++) {
        if (USERS[i].name === userName) {
            USERS[i].response = res
            return;
        }
    }

    res.json({
        response: false
    });
    // console.log(USERS[0].name);
    console.log(req.params);
});

app.get("/hello", (req, res) => {
    res.send("hello!");
});



app.listen(3000, function() {
    console.log('CORS-enabled web server listening on port 3000')
})

//172.30.2.176:3000
// https://github.com/AlexZaprivoda/29.3.git
// teacher2018