import { useState, useEffect } from 'react';
import download from 'downloadjs'
import Progress from './Progress'
import DropZone from './DropZone'
import Error from './Error'
import UploadedList from './UploadedList'
import Thanks from './Thanks'

import AddAPhotoSharpIcon from '@material-ui/icons/AddAPhotoSharp';
import PictureAsPdfSharpIcon from '@material-ui/icons/PictureAsPdfSharp';
import { Trans } from '@lingui/macro';

export default function DropZoneContainer(){
    const [images,setImages] = useState([])
    const [imageUrls, setImageUrls] = useState([]);
    const [pdfs,setPdfs] = useState([]);
    const [pdfUrls, setPdfUrls] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false)
    const [shouldUploadFiles, SetShouldUploadFiles] = useState(false)
    const [showError, setShowError] = useState(false);
    const [sayThanks,setSayThanks] = useState(false);
    const [fileType] = useState("image")
    


    let componentToRender;
    if(showError) componentToRender= <Error massage="Ops! Something Went Wrong."/>;
    else{
      if(isUploading) componentToRender = <Progress massage="Uploading..."/>
      else if(isUploaded){
        if(sayThanks) componentToRender = <Thanks />
        else{
          if(fileType==="image") componentToRender = <UploadedList files={images} fileType={fileType} handleDownload={handleDownload}/>
          else if(fileType==="pdf") componentToRender = <UploadedList files={pdfs} fileType={fileType} handleDownload={handleDownload}/>
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
        if(fileType==="pdf") {
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
          }
          else if(fileType==="pdf"){
            
            for(let i=0; i<pdfs.length;i++){
                formData.append('pdfs',pdfs[i])
                response = await fetch('/upload/pdfs',{
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
              
          }
          
        }
    },[shouldUploadFiles,images,fileType,pdfUrls,pdfs])

    // Pushes single image file to the state
    function handleChange(file){
      if(file.length){
        if(fileType==="image"){
          setImages(file);
        } 
        else if(fileType==="pdf"){
          setPdfs(file)
        } 
        
        setIsUploading(true)
        SetShouldUploadFiles(true);
      }
      
  }

    //handle single compressed image download
    async function handleDownload(compressRatio){
      if(fileType==="image"){
        for(let i=0;i<imageUrls.length;i++){
          download("/download/image/"+imageUrls[i]+"?compressRatio="+compressRatio)
        }
      }
      else if(fileType==="pdf"){
        for(let i=0;i<pdfUrls.length;i++){
          download("/download/pdf/"+pdfUrls[i])
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
    }
    // clear image urls from imageUrls state
    function clearUrls(){
      if(fileType==="image")setImageUrls([]);
      else if(fileType==="pdf") setPdfUrls([])
    }
    
    // handles compress by sending formData 
    

    return(
        <>
          {
            componentToRender
          }
          
        </>
           
       
    )
}

