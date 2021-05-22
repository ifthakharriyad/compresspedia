import "core-js/stable";
import "regenerator-runtime/runtime";

import express from 'express';
import bodyparser from 'body-parser';
import multer from 'multer';
import path from 'path';
import urlencoded from 'body-parser';
import http from 'http'
//Imagemin 
import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminGifsicle from 'imagemin-giflossy';
//import imageminWebp from 'imagemin-webp'
import imageminSvgo from 'imagemin-svgo';
import {extendDefaultPlugins} from 'svgo'

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

app.post('/upload', upload.array("images",10), async (req,res)=>{
    const files = req.files
    //console.log(files);

      let fileUrlArr =files.map(file=>{
            let filePath = path.join(file.filename);
            return filePath;
      })

      res.json(JSON.stringify(fileUrlArr));
      
})

app.get('/download/:imageName', async (req,res)=>{
    //console.log(req.params.imageName)
    let imageName = req.params.imageName
    let path = 'uploads/'+imageName;

    const compressedImage = await imagemin([path], {
        destination: "compressed",
        plugins: [
          imageminPngquant({
            quality: [0.6, 0.8]
          }),
          imageminMozjpeg(),
          imageminGifsicle({lossy: 70}),
          imageminSvgo({
            plugins: extendDefaultPlugins([
                {name: 'removeViewBox', active: false}
            ])
            })
        ]
      });
      //console.log("compressImage:")
      //console.log(compressedImage);
      //res.send("file should start downloading")
      res.download(process.cwd()+"/"+compressedImage[0].destinationPath)
    
})



app.get('/time',(req,res)=>{
    let time = new Date().toString();
    res.send(time)
})

const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
    console.log("Server is listening to "+PORT);
})