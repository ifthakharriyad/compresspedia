import { useState, useEffect } from 'react';
import download from 'downloadjs'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/styles'
import Progress from './Progress'
import DropZone from './DropZone'
import Error from './Error'
import UploadedList from './UploadedList'
import Thanks from './Thanks'

const createStyles = makeStyles((theme)=>({
  dropZoneContainer:{
    marginTop:"3em",
    marginBottom:"3em"
  }
}))

export default function DropZoneContainer(){
    const [images,setImages] = useState([])
    const [imageUrls, setImageUrls] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false)
    const [shouldUploadFiles, SetShouldUploadFiles] = useState(false)
    const [showError, setShowError] = useState(false);
    const [sayThanks,setSayThanks] = useState(false)


    let componentToRender;
    if(showError) componentToRender= <Error massage="Ops! Something Went Wrong."/>;
    else{
      if(isUploading) componentToRender = <Progress massage="Uploading..."/>
      if(isUploaded){
        if(sayThanks) componentToRender = <Thanks />
        else componentToRender = <UploadedList images={images} handleDownload={handleDownload}/>
      } 
      
      else componentToRender = <DropZone handleChange={handleChange}/>
    }

    useEffect(()=>{
      if(shouldUploadFiles){
        handleUpload()
      }
      async function handleUpload(){
        try{
          let formData = new FormData();
          for(let i=0; i<images.length;i++){
            formData.append('images',images[i])
          }
          let response = await fetch('/upload',{
            method:"POST",
            body:formData
          })
          if(response.status===200){
            let data =  await response.json();
            data = JSON.parse(data)
            data.forEach(imageUrl=>{
            addImageUrl(imageUrl)
            })
            setIsUploading(false);
            setIsUploaded(true)
          }else{
            setShowError(true)
          }
        } catch{
          setShowError(true)
        }
        
        }
    },[shouldUploadFiles, images])

    const classes = createStyles();
    // Pushes single image file to the state
    function handleChange(file){
      if(file.length){
        images.push(file)
        setImages(file)
        setIsUploading(true);
        SetShouldUploadFiles(true);
      }
      
  }

    //handle single compressed image download
    async function handleDownload(){
      for(let i=0;i<imageUrls.length;i++){
        download("/download/"+imageUrls[i])
      }
      clearImages()
      clearImageUrls()
      setSayThanks(true)
    }

    // add imageUrl to the imageUrls state
    function addImageUrl(imageName){
      setImageUrls(prevState=>{
        prevState.push(imageName)
        return prevState;
      })
    }

    //clear images from images state
    function clearImages(){
      setImages([])
    }
    // clear image urls from imageUrls state
    function clearImageUrls(){
      setImageUrls([])
    }
    
    // handles compress by sending formData 
    

    return(
        <Container maxWidth="sm" className={classes.dropZoneContainer}>
          {
            componentToRender
          }
        </Container>
           
       
    )
}

