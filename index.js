const amqp = require('amqplib/callback_api');
const fetch = require('node-fetch');

async function fetchData(apiURL) {
    let response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    let data = await response.json();
    return data;
}
var city="Gummersbach";
function weatherFunction(city){
    dataURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e39c5eea5885613eaabe5d2d70b9c5af`
    fetchData(dataURL)
        .then((data) => {
          const weather ={temperature: data.main.temp, rain: data.main.humidity };
         let input= weather;
            console.log(weather);
})
}

weatherFunction(city);