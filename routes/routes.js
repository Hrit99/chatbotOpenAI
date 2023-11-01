const express = require("express")
const { readChats } = require("../db/db")
const router = express.Router()

router.get("/", (req,res,next) => {
    res.send("nothing")
})

router.get("/allchats", async(req,res,next) => {
    const {resp, code} = await readChats()
    console.log(code)
    res.status(code)
    res.json(resp.chats)
})



module.exports = router