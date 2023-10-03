import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
let result;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const apiKey = "9fa1e640d6a79b6d0e50cc04511bfb93";

// const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

app.get("/",(req,res)=>{
  res.render("index.ejs",{content: result});
    
})
app.post("/weather", async (req, res) => {
    try {
        const city = req.body.city;
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        )
        result = response.data;
        console.log(result);
        let temp = result.main.temp;
        //const pass=JSON.stringify(result);
        res.render("index.ejs", { content: result});
        //res.write('<h1>The temperature in '+ city + ' is ' + temp + '</h1>');
    } catch (error) {
      res.status(404).send(error.message);
    }
  });


app.listen(port,()=>{
    console.log(`Server running on port: ${port}`);
});