const express = require('express');
const https = require("https");
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){

  const query = req.body.cityName
  const unit = "metric"
  const appid = "b9cf7f457691488abc1e0fe09affd9cc"
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+appid;

  https.get(url,function(response){
    console.log(response.statuscCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const des = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imgurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      console.log(weatherData);
      res.write("<p>The weather is "+des+"<p>");
      res.write("<h1>the temp in "+query+" is "+temp+" degree celsius</h1>");
      res.write("<img src="+imgurl+" />")
      res.send()
    })

  })
})



app.listen(3000,function(){
  console.log("app is running on 3000");
})
