const express = require("express");
const request = require("request");

const app = express();

app.get("/api/rates", function(req, res) {
    const base = req.query.base;
    const symbols = req.query.currency;
    const options = {
        url: `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${symbols}`,
        method: "GET",
    };
    request(options, function(error, response, body) {
        if (!error & response.statusCode === 200) {
            const info = JSON.parse(body)
            res.status(200).json({results: {base: info.base, date: info.date, rates: info.rates}})
        } else {
            res.status(response.statusCode).json({results: response.statusMessage})
        }
    });
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, function() {
    console.log(`Server started successfully on ${port}`);
})