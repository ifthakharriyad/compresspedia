import "core-js/stable";
import "regenerator-runtime/runtime";

import express from 'express';
import bodyparser from 'body-parser';
import multer from 'multer';
import path from 'path';
import urlencoded from 'body-parser';
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

app.post('/compress', upload.single("images"), async (req,res)=>{
    const files = req.files
    const compressedFiles = await imagemin(['uploads/*.{jpeg,jpg,png,gif,svg}'], {
        destination: "output",
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
      
      //const filepath = path.join(process.cwd()+"/"+compressedFiles[0].destinationPath);
      //const filename = compressedFiles[0].destinationPath.split("/")[1]
      console.log(compressedFiles);
      let fileUrlArr = compressedFiles.map(file=>{
            let filePath = path.join(process.cwd()+'/'+file.destinationPath);
            return filePath;
      })
      //console.log(filepath)
      //res.send(filepath);
      res.json(JSON.stringify(fileUrlArr));
      
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