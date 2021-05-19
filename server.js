const express = require('express')
const app = express()

app.get('/time',(req,res)=>{
    let time = new Date().toString();
    res.send(time)
})

const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
    console.log("Server is listening to "+PORT);
})