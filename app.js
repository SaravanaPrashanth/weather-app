const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const env = require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname +"/index.html");
  });

app.post("/", function(req, res){
  const query = req.body.cityName;
  const unit = "metric";
  const apiKey = env;

  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+process.env.API_KEY;

  https.get(url, function(response){

    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      // console.log(weatherData);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const location = weatherData.name;
      const icon = weatherData.weather[0].icon;

      const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"

      console.log(location);
      console.log(desc);
      // console.log(temp);
      res.write("<h1>The Temperature in " +location+" is "+temp+" degrees Celsius</h1>");
      res.write("<p> The Weather is currently "+desc+"</p>");
      res.write("<img src=" +imageURL+ ">");
      res.send();
    });
  });
});




app.listen(3000, function()
{
  console.log("Server is listening at Port 3000");
});
