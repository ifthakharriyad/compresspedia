import { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';

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
    const classes = useStyles();

    function handleAdd(file){
      images.push(file)
      setImages(file)
      //console.log(images[images.length-1])
    }
    function handleCompress(){
      // TODO: send files to the compress api
      setImages([])
    }
    return(
        <div>
           <DropzoneArea
            acceptedFiles={['.jpeg','.jpg','.png']}
            filesLimit={10}
            Icon={AddAPhotoSharpIcon}
            maxFileSize={5242880}
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

