const express=require("express");
const https=require("https");
const app=express();
const body_parser=require("body-parser");
app.listen(3000, function(){
    console.log("Sever is running on port 3000.");
});
app.use(body_parser.urlencoded({extended:true}));
app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
    //Making request from API
    const api_key="34e69ac7a6db8954141ab3d6ea47e9fc";
    const unit="metric";
    const query=req.body.city_name;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+api_key;
    https.get((url), function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
        const weather_data=JSON.parse(data);
        const temp=weather_data.main.temp;
        const weather_description=weather_data.weather[0].description;
        const icon=weather_data.weather[0].icon;
        const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<p>The weather is currently "+weather_description+".</p>");
        res.write("<h1>The temperature in "+query+" is "+temp+" degree celsius.</h1>");
        res.write("<img src="+imageURL+">");
        res.send();
        });
    });
});
