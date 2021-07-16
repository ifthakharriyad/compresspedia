import "core-js/stable";
import "regenerator-runtime/runtime";

import express from 'express';
import bodyparser from 'body-parser';
import multer from 'multer';
import path from 'path';
import fs from 'fs'
import { exec } from  'child_process';
//Imagemin 
import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminGifsicle from 'imagemin-giflossy';
//import imageminWebp from 'imagemin-webp'
import imageminSvgo from 'imagemin-svgo';
import {extendDefaultPlugins} from 'svgo';

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

app.post('/upload/images', upload.array("images",20), async (req,res)=>{
    const files = req.files

      let fileUrlArr =files.map(file=>{
            let filePath = path.join(file.filename);
            return filePath;
      })
      res.json(JSON.stringify(fileUrlArr));
      
})

app.post('/upload/pdfs', upload.array("pdfs",20), async (req,res)=>{
    const files = req.files
        let fileUrlArr =files.map(file=>{
            let filePath = path.join(file.filename);
            return filePath;
      })
      

      res.json(JSON.stringify(fileUrlArr));
      
})

app.post('/upload/videos', upload.array("videos",5), async (req,res)=>{
    const files = req.files
        let fileUrlArr =files.map(file=>{
            let filePath = path.join(file.filename);
            return filePath;
      })
      

      res.json(JSON.stringify(fileUrlArr));
      
})

// Handle Image compression and download
app.get('/download/image/:imageName', async (req,res)=>{
    let imageName = req.params.imageName
    let compressRatio= Number(req.query.compressRatio)
    let pngRatio= {
        max:compressRatio/100,
        min:(compressRatio/100)-((compressRatio/100)*.2)
    }
    let jpegRatio = compressRatio;
    let gifRatio = Math.ceil(3-((compressRatio/100)*3))
    let path = 'uploads/'+imageName;
    let compressedPath = 'compressed/'+imageName
    const compressedImage = await imagemin([path], {
        destination: "compressed",
        plugins: [
          imageminPngquant({
            quality: [pngRatio.min, pngRatio.max]
          }),
          imageminMozjpeg({quality:jpegRatio}),
          imageminGifsicle({lossy: 70, optimizationLevel:gifRatio}),
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
            console.log(path.split("/")[1]+" has been deleted!")
        });
        fs.unlink(compressedPath, function() {
            console.log(compressedPath.split("/")[1]+" has been deleted!")
        });
        });
        file.pipe(res);
})

// Handles Pdf compression and download
app.get('/download/pdf/:pdfName', async (req,res)=>{
    let pdfName = req.params.pdfName
    let path = 'uploads/'+pdfName;
    let compressedPath = 'compressed/'+pdfName

    exec(`gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=./${compressedPath} ./${path}`,(error)=>{
        if(error){
            console.error(`Error encountered while compressing ${pdfName}`);
        }else{
            let file = fs.createReadStream(compressedPath);
            file.on('end', function() {
            fs.unlink(path, function() {
                console.log(path.split("/")[1]+" hase been deleted!")
            });
            fs.unlink(compressedPath, function() {
                console.log(compressedPath.split("/")[1]+" hase been deleted!")
            });
        });
        file.pipe(res);
        }
        
    })

})

app.get('/download/video/:videoName', async (req,res)=>{
    let videoName = req.params.pdfName
    let compressRatio= Number(req.query.compressRatio)
    let path = 'uploads/'+videoName;
    let compressedPath = 'compressed/'+videoName
    let crf= 18+Math.ceil((compressRatio/100)*6)
    let widthScale = 0.5+Math.ceil((compressRatio/100)*6);
    let heightScale = 0.5+Math.ceil((compressRatio/100)*6);
    console.log("crf"+crf)
    console.log("width: "+widthScale)
    console.log("width: "+heightScale)
    exec('touch hello1.txt');
    /*exec(`ffmpeg -i ./${path} -vf "scale=iw*.50:ih*.50" ./${compressedPath}`,{timeout:10},(error)=>{
        if(error){
            console.error(`Error encountered while compressing ${videoName}`);
        }else{
            let file = fs.createReadStream(compressedPath);
        file.on('end', function() {
        fs.unlink(path, function() {
            console.log(path.split("/")[1]+" hase been deleted!")
        });
        fs.unlink(compressedPath, function() {
            console.log(compressedPath.split("/")[1]+" hase been deleted!")
            });
        });
        file.pipe(res);
        }
        
    })*/

})


const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
    console.log("Server is listening to "+PORT);
})