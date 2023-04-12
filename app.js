import express from "express";
import request from "request";
import path from "path";
const app = express();
const port = 4000;

app.use(express.static(path.join(path.resolve() + "/public")));
app.set("view engine", "ejs");
app.set("views", "./src/views");
//console.log(path.join(path.resolve() + "/public"));

app.get("/weather/:city", (req, res) => {
  let city = req.params.city;
  let url = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
  request(url, (err, apiResponse) => {
    if (err) throw err;
    const output = JSON.parse(apiResponse.body);
    res.send(output);
  });
});

app.listen(port);
