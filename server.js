import "core-js/stable";
import "regenerator-runtime/runtime";
import express from 'express';
import bodyparser from 'body-parser';
import multer from 'multer';
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import path from 'path';
import urlencoded from 'body-parser';

const app = express()
app.use('/uploads', express.static(path.join(__dirname+'/uploads')));

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage
})

app.post('/compress', upload.array("images",10), async (req,res)=>{
    //const files = req.files
   // console.log(files);
    //console.log("aaaaaaa")
    //res.send("File uploaded");
   /* const compressedFiles = await imagemin(["uploads/*.{jpg,jpeg,png}"], {
        destination: "output",
        plugins: [
          imageminJpegtran(),
          imageminPngquant({
            quality: [0.6, 0.8]
          })
        ]
      });*/
    res.send("file compressed")
})



app.get('/time',(req,res)=>{
    let time = new Date().toString();
    //console.log(time)
    res.send(time)
})

const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
    console.log("Server is listening to "+PORT);
})