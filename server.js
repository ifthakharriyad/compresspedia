const express = require('express')
const bodyparser = require('body-parser')
const multer = require('multer')
const imagemin = require('imagemin')
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const path = require('path');
const { urlencoded } = require('body-parser');

const app = express()
app.use('/uploads', express.static(path.join(__dirname+'/uploads')));

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads")
    },
    filename:(req,file,cb)=>{
        cb(null, file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage
})

app.post('/compress', upload.array("images",10), (req,res)=>{
    const files = req.files
    res.send("file uploaded")
})



app.get('/time',(req,res)=>{
    let time = new Date().toString();
    res.send(time)
})

const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
    console.log("Server is listening to "+PORT);
})