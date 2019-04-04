var express = require('express')
var cors = require('cors')
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
var app = express()

app.use(cors())
app.use(bodyParser.json());

app.use(express.static("./public"));

let USERS = [];
app.post("/reg", (req, res) => {
    // console.log(req.body);
    const userName = req.body.name;
    if (!userName) {
        return res.json({
            response: false
        });
    }

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
    const { message, name } = req.body;
    // console.log(message, from, to)

    if (USERS.some((user) => user.name === name)) {
        USERS.forEach((user) => {
            if (user.response) {
                try {
                    user.response.json({
                        text: message,
                        from: name
                    })
                    user.response = null;
                } catch (e) {

                }
            }
        });

        res.json({
            response: true
        });
    } else res.json({
        response: false
    });
});

app.get("/conn/:userName", (req, res) => {
    const { userName } = req.params;
    // console.log(req.params);

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
});

app.get("/hello", (req, res) => {
    res.send("hello!");
});

app.listen(PORT, function() {
    console.log('CORS-enabled web server listening on port 3000')
})

// setInterval(() => {
//     console.log(USERS.name);
// }, 1500);

//172.30.2.176:3000
// teacher2018
//https://github.com/AlexZaprivoda/02.04.git