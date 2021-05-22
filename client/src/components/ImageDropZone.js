import { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import download from 'downloadjs'

// ICONS
import AddAPhotoSharpIcon from '@material-ui/icons/AddAPhotoSharp';
import { Button } from '@material-ui/core';




const useStyles = makeStyles(theme => createStyles({
    previewChip: {
      minWidth: 160,
      maxWidth: 210
    },
  }));


export default function ImageDropZone(){
    const [images,setImages] = useState([])
    const [imageUrls, setImageUrls] = useState([]);
    const classes = useStyles();

    // Pushes single image file to the state
    function handleAdd(file){
      images.push(file)
      setImages(file)
    }

    //handle single compressed image download
    function handleDownload(){
      for(let i=0;i<imageUrls.length;i++){
        download("/download/"+imageUrls[i])
      }
      clearImages()
      clearImageUrls()
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
    async function handleCompress(){
      let formData = new FormData();
      for(let i=0; i<images.length;i++){
        formData.append('images',images[i])
      }
      let response = await fetch('/upload',{
        method:"POST",
        body:formData
      })
      let data =  await response.json();
      data = JSON.parse(data)
      data.forEach(imageUrl=>{
        addImageUrl(imageUrl)
      })
      handleDownload()
    }

    return(
        <div>
           <DropzoneArea
            acceptedFiles={['image/jpeg','image/jpg','image/png', 'image/gif', 'image/svg']}
            filesLimit={10}
            Icon={AddAPhotoSharpIcon}
            maxFileSize={6242880}
            dropzoneText="Drop images here or Click"
            showPreviews={true}
            showPreviewsInDropzone={false}
            showFileNames={true}
            useChipsForPreview
            previewGridProps={{container: { spacing: 1, direction: 'row' }}}
            previewChipProps={{classes: { root: classes.previewChip } }}
            previewText="Selected images:"
            onChange={handleAdd}
            />
            <Button variant='contained' color="primary" size="medium" onClick={handleCompress}>Compress</Button>
        </div>
           
       
    )
}

