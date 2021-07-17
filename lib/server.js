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

//Handles image upload
app.post('/upload/images', upload.array("images",20), async (req,res)=>{
    const files = req.files

      let fileUrlArr =files.map(file=>{
            let filePath = path.join(file.filename);
            return filePath;
      })
      res.json(JSON.stringify(fileUrlArr));
      
})


// Handle Image compression 
app.get('/compress/image', async (req,res)=>{
    try{
        let imageName = req.query.imageName
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

          res.sendStatus(200);
    }catch(error){
        console.error(error)
        res.sendStatus(500);
    }
})

//Handles image download
app.get("/download/image", (req,res)=>{
    try{
        let compressedPath= req.query.url;
        let path = "uploads/"+compressedPath.split("/")[1]
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
    }catch(error){
        console.error(error)
        res.sendStatus(500);
    }
})


//Handles pdf upload
app.post('/upload/pdfs', upload.array("pdfs",20), async (req,res)=>{
    const files = req.files
        let fileUrlArr =files.map(file=>{
            let filePath = path.join(file.filename);
            return filePath;
      })
      

      res.json(JSON.stringify(fileUrlArr));
      
})

// Handles Pdf compression
app.get('/compress/pdf', (req,res)=>{
    let pdfName = req.query.pdfName
    let path = 'uploads/'+pdfName;
    let compressedPath = 'compressed/'+pdfName

    exec(`gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=./${compressedPath} ./${path}`,(error)=>{
        if(error){
            console.error(`Error encountered while compressing ${pdfName}`);
            res.sendStatus(500)
        }else{
            res.sendStatus(200);
        }
        
    })

})

//Handles pdf download
app.get('/download/pdf',(req,res)=>{
    try{
        let compressedPath= req.query.url;
        let path = "uploads/"+compressedPath.split("/")[1]
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
    }catch(error){
        console.error(error)
        res.sendStatus(500);
    }
})

//Handles video upload
app.post('/upload/videos', upload.array("videos",5), async (req,res)=>{
    const files = req.files
        let fileUrlArr =files.map(file=>{
            let filePath = path.join(file.filename);
            return filePath;
      })
    res.json(JSON.stringify(fileUrlArr));
      
})

//Handles video compression
app.get('/compress/video', async (req,res)=>{
    let videoName = req.query.videoName
    let compressRatio= Number(req.query.compressRatio)
    let path = 'uploads/'+videoName;
    let compressedPath = 'compressed/'+videoName
    let crf = 24-Math.ceil((((compressRatio/100)-.5)*2)*6)
    let widthScale = 0.5+((compressRatio/2)/100);
    let heightScale = 0.5+((compressRatio/2)/100);
    console.log("crf"+crf)
    console.log("width: "+widthScale)
    console.log("height: "+heightScale)

    exec(`ffmpeg -i ./${path} -crf ${crf} -vf "scale=iw*${widthScale}:ih*${heightScale}" ./${compressedPath}`,{timeout:360000},(error)=>{
        if(error){
            console.error(`Error encountered while compressing ${videoName}`);
            res.sendStatus(500);
        }else{
            res.sendStatus(200);
        }
        
    })

})

//Handles video download
app.get('/download/video',(req,res)=>{
    try{
        let compressedPath = req.query.url
        let path = "uploads/"+compressedPath.split("/")[1]
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
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
    
})

const PORT = process.env.PORT || 3001

app.listen(PORT,()=>{
    console.log("Server is listening to "+PORT);
})