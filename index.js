const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const route = require('./routes/routes')
const cors = require('cors')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});
require('dotenv').config()
const { saveChat } = require('./db/db')
const { usermessage } = require('./socket')



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// cors
// app.use(cors)

// initializing port
let port = process.env.PORT || 3000

// setting headers
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
})


// route
app.use(route)


const initServer =
    async () => {
  try {
    // listening to the server
    server.listen(
           port, () => {console.log(`Example app listening on port ${port}`)})

        // connecting to the database
        await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to database.')
  } catch (error) {
    // exit server on error
    console.error(error);
    process.exit(1);
  }
}

const maxTokens = 50;

const ioevents = () => {
    io.on('connection', (socket) => {
        console.log('user connected');
        socket.on('disconnect', function () {
          console.log('user disconnected');
        });
        socket.on('usermessage', async function (prompt) {
            usermessage(socket, prompt)
            saveChat({
                "sender": "user",
                "content": prompt
            })
          });
      })
}
initServer()
ioevents()


module.exports = {
    app
};