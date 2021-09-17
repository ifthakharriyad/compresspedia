import "core-js/stable";
import "regenerator-runtime/runtime";
import util from 'util'
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

const execPromise = util.promisify(exec);
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

// Serves index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

//Handles image upload
app.post('/upload/images', upload.array("images",20), async(req,res)=>{
     const files = await req.files
     //console.log(files);

      let fileUrlArr =files.map(file=>{
            let filePath = path.join(file.filename);
            return filePath;
      })
      //console.log("file url array: "+fileUrlArr)
      res.json(JSON.stringify(fileUrlArr));
})


// Handle Image compression 
app.get('/compress/images', async (req,res)=>{
    try{
        let imageNameArray = req.query.imageNames
        if(!Array.isArray(imageNameArray)){
            imageNameArray = new Array(imageNameArray)
        }
        let imagePathArray = imageNameArray.map(imageName=>'uploads/'+imageName)
        
        let compressRatio= Number(req.query.compressRatio)
        let pngRatio= {
            max:compressRatio/100,
            min:(compressRatio/100)-((compressRatio/100)*.2)
        }
        let jpegRatio = compressRatio;
        let gifRatio = Math.ceil(3-((compressRatio/100)*3))

             imagemin([...imagePathArray], {
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
              }).then(
                  ()=>res.sendStatus(200)
              );
      ;
    }catch(error){
        console.error(error)
        res.sendStatus(500);
    }
})

//Handles image download
app.get("/download/image", (req,res)=>{
    try{
        let fileName = req.query.url
        let compressedPath="compressed/"+req.query.url;
        let path = "uploads/"+req.query.url;
        let url= process.cwd()+'/compressed/'+fileName
        res.setHeader("Content-Type","image/jpeg");
        res.setHeader("Content-Dispositon","attachment; filename=" + 'test.jpeg');
        res.sendFile(url,{
            headers:{
                "Content-Disposition":`attachment;filename=${fileName}`
            }
            
        },function(err){
            if(err){
                console.error(err)
                res.sendStatus(500)
            }else{
                console.log("File send: "+fileName);
                setTimeout(()=>{
                    fs.unlink(path, function() {
                        console.log(path.split("/")[1]+" has been deleted from uploads folder!")
                    });
                    fs.unlink(compressedPath, function() {
                        console.log(compressedPath.split("/")[1]+" has been deleted from compressed folder!")
                    });
                },36000)
            }

        })
    }catch(error){
        console.error(error)
        res.sendStatus(500);
    }
})


//Handles pdf upload
app.post('/upload/pdfs', upload.array("pdfs",20), async (req,res)=>{
    const files = await req.files
        let fileUrlArr =files.map(file=>{
            let filePath = path.join(file.filename);
            return filePath;
      })
      
      res.json(JSON.stringify(fileUrlArr));
      
})

// Handles Pdf compression
app.get('/compress/pdfs', async (req,res)=>{
    if(Array.isArray(req.query.pdfNames)){
        let pdfNameArray =req.query.pdfNames
        pdfNameArray=pdfNameArray.map(pdfName=>{
            let path = 'uploads/'+pdfName;
            let compressedPath = 'compressed/'+pdfName
    
             return execPromise(`gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=./${compressedPath} ./${path}`)
        })
        Promise.all(pdfNameArray).then(()=>{
            res.sendStatus(200)
        }).catch(()=>{
            console.error(error)
            res.sendStatus(500)
        })

    }else{
        let path = 'uploads/'+req.query.pdfNames
        let compressedPath = 'compressed/'+req.query.pdfNames
        execPromise(`gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=./${compressedPath} ./${path}`)
        .then(()=>{
            res.sendStatus(200);
        })
    }
 
    //let pdfPathArray = pdfNameArray.map(pdfName=>"uploads/"+pdfName)
    
    
    
  

})

//Handles pdf download
app.get('/download/pdf',(req,res)=>{
    try{
        let fileName = req.query.url
        let compressedPath="compressed/"+req.query.url;
        let path = "uploads/"+req.query.url;
        let url= process.cwd()+"/"+compressedPath
        
           res.sendFile(url,{
            headers:{
                "Content-Disposition":`attachment;filename=${fileName}`
            }
            
        },function(err){
            if(err){
                console.error(err)
                res.sendStatus(500)
            }else{
                console.log("File send: "+fileName);
                setTimeout(()=>{
                    fs.unlink(path, function() {
                        console.log(path.split("/")[1]+" has been deleted from uploads folder!")
                    });
                    fs.unlink(compressedPath, function() {
                        console.log(compressedPath.split("/")[1]+" has been deleted from compressed folder!")
                    });
                },36000)
            }

        })
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
app.get('/compress/videos', async (req,res)=>{
    let videoNameArray = req.query.videoNames
    let compressRatio= Number(req.query.compressRatio)
    let crf = 24-Math.ceil((((compressRatio/100)-.5)*2)*6)
    let widthScale = 0.5+((compressRatio/2)/100);
    let heightScale = 0.5+((compressRatio/2)/100);
    if(!Array.isArray(videoNameArray)){
        videoNameArray = new Array(videoNameArray)
    }
    videoNameArray=videoNameArray.map((videoName)=>{
        let path = 'uploads/'+videoName;
        let compressedPath = 'compressed/'+videoName
        
        return execPromise(`ffmpeg -i ./${path} -crf ${crf} -vf "scale=iw*${widthScale}:ih*${heightScale}" ./${compressedPath}`)
    })
    Promise.all(videoNameArray).then(()=>{
        res.sendStatus(200);
    }).catch(err=>{
        console.log(err)
        res.sendStatus(500);
    })
})

//Handles video download
app.get('/download/video',(req,res)=>{
    try{
        let fileName = req.query.url
        let compressedPath ="compressed/"+req.query.url
        let path = "uploads/"+compressedPath.split("/")[1]
        let url= process.cwd()+"/"+compressedPath

        res.sendFile(url,{
            headers:{
                "Content-Disposition":`attachment;filename=${fileName}`
            }
            
        },function(err){
            if(err){
                console.error(err)
                res.sendStatus(500)
            }else{
                console.log("File send: "+fileName);
                setTimeout(()=>{
                    fs.unlink(path, function() {
                        console.log(path.split("/")[1]+" has been deleted from uploads folder!")
                    });
                    fs.unlink(compressedPath, function() {
                        console.log(compressedPath.split("/")[1]+" has been deleted from compressed folder!")
                    });
                },36000)
            }

        })
    }catch(error){
        console.error(error);
        res.sendStatus(500);
    }
    
})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log("Server is listening to "+PORT);
})