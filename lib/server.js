import "core-js/stable";
import "regenerator-runtime/runtime";

import express from 'express';
import bodyparser from 'body-parser';
import multer from 'multer';
import path from 'path';
import urlencoded from 'body-parser';
import fs from 'fs'
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
app.use(express.static(path.join(__dirname,'../client/build')));

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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.post('/upload', upload.array("images",10), async (req,res)=>{
    const files = req.files

      let fileUrlArr =files.map(file=>{
            let filePath = path.join(file.filename);
            return filePath;
      })

      res.json(JSON.stringify(fileUrlArr));
      
})

app.get('/download/:imageName', async (req,res)=>{
    let imageName = req.params.imageName
    let path = 'uploads/'+imageName;
    let compressedPath = 'compressed/'+imageName
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

        let file = fs.createReadStream(compressedPath);
        file.on('end', function() {
        fs.unlink(path, function() {
            console.log(path+" hase been deleted!")
        });
        fs.unlink(compressedPath, function() {
            console.log(compressedPath+" hase been deleted!")
        });
        });
        file.pipe(res);
})

const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
    console.log("Server is listening to "+PORT);
})