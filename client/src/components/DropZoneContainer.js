import { useState, useEffect } from 'react';
import download from 'downloadjs'
import Progress from './Progress'
import DropZone from './DropZone'
import Error from './Error'
import UploadedList from './UploadedList'
import Thanks from './Thanks'

import AddAPhotoSharpIcon from '@material-ui/icons/AddAPhotoSharp';
import PictureAsPdfSharpIcon from '@material-ui/icons/PictureAsPdfSharp';
import VideoLibrarySharpIcon from '@material-ui/icons/VideoLibrarySharp';
import { Trans } from '@lingui/macro';
import FileTypeButton from './FileTypeButton';



export default function DropZoneContainer(){
  const types=['image','pdf','video'];
    const [images,setImages] = useState([])
    const [imageUrls, setImageUrls] = useState([]);
    const [pdfs,setPdfs] = useState([]);
    const [pdfUrls, setPdfUrls] = useState([]);
    const [videos,setVideos] = useState([]);
    const [videoUrls, setVideoUrls] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [isCompressing, setIsCompressing] = useState(false)
    const [isCompressed, setIsCompressed] = useState(false);
    const [shouldUploadFiles, SetShouldUploadFiles] = useState(false)
    const [showError, setShowError] = useState(false);
    const [sayThanks,setSayThanks] = useState(false);
    const [fileTypeIndex,setFileTypeIndex] = useState(0);
    const [fileType, setFileType] = useState(types[fileTypeIndex])

    let componentToRender;
    if(showError) componentToRender= <Error massage="Ops! Something Went Wrong."/>;
    else if(sayThanks) componentToRender = <Thanks />
    else{
      if(isUploading) componentToRender = <Progress massage="Uploading..."/>
      else if(isUploaded){
          if(isCompressing){
            if(isCompressed){
              if(fileType==="image") componentToRender = <UploadedList isCompressed={isCompressed} compLev={{min:10,max:99}} files={images} fileType="image" handleDownload={handleDownload} handleCompress={handleCompress}/>
              else if(fileType==="pdf") componentToRender = <UploadedList isCompressed={isCompressed}  files={pdfs} fileType="pdf" handleDownload={handleDownload} handleCompress={handleCompress}/>
              else if(fileType==="video") componentToRender = <UploadedList isCompressed={isCompressed} compLev={{min:50,max:99}} files={videos} fileType="video" handleDownload={handleDownload} handleCompress={handleCompress}/>
            }else{
              componentToRender = <Progress massage="Compressing..."/>
            }
          }else{
            if(fileType==="image") componentToRender = <UploadedList  compLev={{min:10,max:99}} files={images} fileType={fileType} handleDownload={handleDownload} handleCompress={handleCompress}/>
            else if(fileType==="pdf") componentToRender = <UploadedList  files={pdfs} fileType={fileType} handleDownload={handleDownload} handleCompress={handleCompress}/>
            else if(fileType==="video") componentToRender = <UploadedList compLev={{min:50,max:99}} files={videos} fileType={fileType} handleDownload={handleDownload} handleCompress={handleCompress}/>
          }
      } 
      
      else{
        if(fileType==="image") {
          let dropzoneImgText = <Trans>Drop JPG, PNG, GIF or Click</Trans>
          let dropzoneImgSubText = <Trans>* Up to 20 images, max 20 MB each.</Trans>
          componentToRender = <DropZone 
                                handleChange={handleChange}
                                accepted={['image/jpeg','image/jpg','image/png', 'image/gif', 'image/svg']}
                                filesLimit={20}
                                icon={AddAPhotoSharpIcon}
                                maxFileSize={20971520}
                                dropZoneText={dropzoneImgText}
                                subtitle={dropzoneImgSubText}

                              />
                            }
        else if(fileType==="pdf") {
          let dropzonePdfText = <Trans>Drop PDFs or Click</Trans>
          let dropzonePdfSubText = <Trans>* Up to 20 pdfs, max 100 MB each.</Trans>
          componentToRender = <DropZone 
                                handleChange={handleChange}
                                accepted={['.pdf']}
                                filesLimit={20}
                                icon={PictureAsPdfSharpIcon}
                                maxFileSize={104857600}
                                dropZoneText={dropzonePdfText}
                                subtitle={dropzonePdfSubText}
                              />
                            }
        else if(fileType==="video") {
          let dropzoneVideoText = <Trans>Drop Videos or Click</Trans>
          let dropzoneVideoSubText = <Trans>* Up to 5 Videos, max 100 MB each.</Trans>
          componentToRender = <DropZone 
                                handleChange={handleChange}
                                accepted={['video/*']}
                                filesLimit={5}
                                icon={VideoLibrarySharpIcon}
                                maxFileSize={104857600}
                                dropZoneText={dropzoneVideoText}
                                subtitle={dropzoneVideoSubText}
                              />
                            }
      } 
    }

    useEffect(()=>{
      if(shouldUploadFiles){
        handleUpload()
        SetShouldUploadFiles(false);
      }
      async function handleUpload(){
        try{
          let formData = new FormData();
          let response;
          if(fileType==="image"){
            for(let i=0; i<images.length;i++){
                formData.append('images',images[i]); 
            }
            response = await fetch('/upload/images',{
              method:"POST",
              body:formData
            })
            if(response.status===200){
              let data =  await response.json();
              data = JSON.parse(data)
              data.forEach(url=>{
                addUrl(url)
              })
            
            setIsUploading(false);
            setIsUploaded(true)
          }else{
            setShowError(true)
          }
          }
          else if(fileType==="pdf"){
            for(let i=0; i<pdfs.length;i++){
                formData.append('pdfs',pdfs[i])
              }
              response = await fetch('/upload/pdfs',{
                method:"POST",
                body:formData
              }) 
              if(response.status===200){
                let data =  await response.json();
                data = JSON.parse(data)
                data.forEach(url=>{
                  addUrl(url)
                })
                setIsUploading(false);
                setIsUploaded(true)
              }else{
                setShowError(true)
              }
          }

          else if(fileType==="video"){
            for(let i=0; i<videos.length;i++){
                formData.append('videos',videos[i])
                response = await fetch('/upload/videos',{
                  method:"POST",
                  body:formData
                })
              } 
              if(response.status===200){
                let data =  await response.json();
                data = JSON.parse(data)
                data.forEach(url=>{
                  addUrl(url)
                })
                setIsUploading(false);
                setIsUploaded(true)
              }else{
                setShowError(true)
              }
          }
          
        }catch{
          setShowError(true)
        }
        }
        // add imageUrl to the imageUrls state
        function addUrl(name){
          if(fileType==="image"){
            setImageUrls(prevState=>{
              return [...prevState,name];
            })
          } else if(fileType==="pdf"){
            setPdfUrls((prevState)=>{
              return [...prevState,name]
            })
          } else if(fileType==="video"){
            setVideoUrls((prevState)=>{
              return [...prevState,name]
            })
          }
          
        }
    },[shouldUploadFiles,images,fileType,pdfUrls,pdfs,videos])

    // Pushes single image file to the state
    function handleChange(file){
      if(file.length){
        if(fileType==="image"){
          setImages(file);
        } 
        else if(fileType==="pdf"){
          setPdfs(file)
        } 
        else if(fileType==="video"){
          setVideos(file)
        } 
        
        setIsUploading(true)
        SetShouldUploadFiles(true);
      }
      
  }
    
    async function handleCompress(compressRatio){
      setIsCompressing(true)
      if(fileType==="image"){
        let imagesQueryString='' ;
        for(let i=0;i<imageUrls.length;i++){
          imagesQueryString = imagesQueryString+"imageNames="+imageUrls[i]+"&";
        }
        let response = await fetch("/compress/images?"+imagesQueryString+"compressRatio="+compressRatio)
          if(response.ok){
            setIsCompressed(true)
          }else{
            setShowError(true)
          }
      }
      else if(fileType==="pdf"){
        let pdfQueryString='';
        for(let i=0;i<pdfUrls.length;i++){
          if(i===pdfUrls.length) pdfQueryString += "pdfNames="+pdfUrls[i];
          else pdfQueryString += "pdfNames="+pdfUrls[i]+"&"
        }
        let response = await fetch("/compress/pdfs?"+pdfQueryString+"compressRatio="+compressRatio)
        if(response.ok){
          setIsCompressed(true)
        }else{
          setShowError(true)
        }
      }
      else if(fileType==="video"){
        let videoQueryString = '';
        for(let i=0;i<videoUrls.length;i++){
          videoQueryString+="videoNames="+videoUrls[i]+"&";
        }
        let response = await fetch("/compress/videos?"+videoQueryString+"compressRatio="+compressRatio)
        if(response.ok){
          setIsCompressed(true)
        }else{
          setShowError(true)
        }
      }
    }
    //handle single compressed image download
    async function handleDownload(){
      if(fileType==="image"){
        for(let i=0;i<imageUrls.length;i++){
          download("/download/image?url="+imageUrls[i])
        }
      }
      else if(fileType==="pdf"){
        for(let i=0;i<pdfUrls.length;i++){
          download("/download/pdf?url="+pdfUrls[i])
        }
      }
      else if(fileType==="video"){
        for(let i=0;i<videoUrls.length;i++){
          download("/download/video?url="+videoUrls[i])
        }
      }
      
      clearFiles()
      clearUrls()
      setSayThanks(true)
    }
    

    //clear images from images state
    function clearFiles(){
      if(fileType==="image")setImages([]);
      else if(fileType==="pdf") setPdfs([])
      else if(fileType==="video") setVideos([])
    }
    // clear image urls from imageUrls state
    function clearUrls(){
      if(fileType==="image")setImageUrls([]);
      else if(fileType==="pdf") setPdfUrls([])
      else if(fileType==="video") setVideoUrls([])
    }
    
    //handles filetype select
    function handleFileSelect(index){
      setFileTypeIndex(index);
      setFileType(types[index])
    }
    

    return(
        <>
          <FileTypeButton types={types} handleFileSelect={handleFileSelect} currentTypeIndex={fileTypeIndex}/>
          {
            componentToRender
          }
          
        </>
           
       
    )
}

