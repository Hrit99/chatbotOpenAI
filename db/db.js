const chat = require("./model")

const saveChat =
    async (newChat) => {
  try {
    const createdChat = await chat.create(newChat)
  } catch (error) {
    console.log("Failed to save chat.")
  }
}


const readChats =
    async () => {
  try {
    const chats = await chat.find({})
    if (chats.length == 0) {
        console.log("1")
      return {
        'resp': {fetched: false, error: 'zero matches'}, 'code': 404
      }
    }
    else {
        console.log("2")
      return {
        'resp': {fetched: true, chats}, 'code': 202
      }
    }
  } catch (error) {
    console.log("3")
    return {
      'resp': {fetched: false, error: 'Unable to read blogs.'}, 'code': 401
    }
  }
}

module.exports = {
    saveChat, readChats
  }