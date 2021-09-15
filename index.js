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
            
            //Create Connection
amqp.connect('amqp://localhost', (connError, connection) =>{
  if(connError){
    throw connError;
  }
  //Create Channel
  connection.createChannel((channelError, channel)=>{
    if(channelError){
      throw channelError;
    }
    //Assert Queue
    const QUEUE = 'Wetterdaten'
    channel.assertQueue(QUEUE);

    
    //Send message to queue
    channel.sendToQueue(QUEUE,Buffer.from(JSON.stringify(input, null, 2)))
    console.log('Message send %s',QUEUE);
    console.log(input);
        })
  }).catch((error) => {
    console.log('error', error);
}); 
})
}

weatherFunction(city);