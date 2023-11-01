require('dotenv').config()
const OpenAI = require("openai");
const { saveChat } = require('./db/db');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
  });

const usermessage = async (socket, prompt) => {
    console.log(`got a message from user: ${prompt}`);
    try{
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
      });
      const resp = chatCompletion.choices[0].message.content
      saveChat({
        "sender": "openai",
        "content": resp
    })
      socket.emit("servermessage", resp)
    }
    catch(error){
        console.log(error)
        socket.emit("servermessageerror", error)
    }
}

module.exports = {
    usermessage
  }