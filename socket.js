require('dotenv').config()
const OpenAI = require("openai");
const { saveChat } = require('./db/db');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
  });


  //Module to recieve message from user and call OpenAI api to g et response.
const usermessage = async (socket, prompt) => {
    console.log(`got a message from user: ${prompt}`);
    try{

        //calling openAI api
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
      });
      const resp = chatCompletion.choices[0].message.content //response message from OpenAI
      saveChat({
        "sender": "openai",
        "content": resp
    }) //saving response from openAI to mongodb
      socket.emit("servermessage", resp) //emits response back to the user
    }
    catch(error){
        console.log(error)
        socket.emit("servermessageerror", error)
    }
}

module.exports = {
    usermessage
  }