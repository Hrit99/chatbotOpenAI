const express = require("express")
const { readChats } = require("../db/db")
const router = express.Router()


//initial route
router.get("/", (req,res,next) => {
    res.send("nothing")
})



// route to get all chats from database for initialization
router.get("/allchats", async(req,res,next) => {
    const {resp, code} = await readChats()
    console.log(code)
    res.status(code)
    res.json(resp.chats)
})



module.exports = router