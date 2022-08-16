const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(request, responce) {
    responce.sendFile(__dirname + "/index.html");
});

app.post("/", function(request, responce) {
    var city = request.body.cityName;
    var apiKey = "dummy";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";
    https.get(url, function(urlResponce){
        urlResponce.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            // responce.write("<h2>The Temprature in " + city + "is" + temp + "Celcius.</h2>");
            // responce.write("<h4>You can see" + description + "<img src=" + iconUrl + "> out of your windows.</h4>");
            // responce.send();
            responce.send("<h2>The Temprature in " + city + " is " + temp + " Celcius.</h2> <br> <h4>You can see " + description + "<img src=" + iconUrl + "> out of your windows.</h4>");
        });
    });
})

app.listen(3000, function() {
    console.log("Server is running on portn 3000");
});