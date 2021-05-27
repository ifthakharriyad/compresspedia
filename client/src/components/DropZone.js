import { DropzoneArea } from 'material-ui-dropzone';
import AddAPhotoSharpIcon from '@material-ui/icons/AddAPhotoSharp';
import  Typography  from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(()=>({
    limitSubtitle:{
        padding:"20px"
    }
}))

export default function DropZone(props){
    const classes = useStyles()
    return(
        <>
            <DropzoneArea
                acceptedFiles={['image/jpeg','image/jpg','image/png', 'image/gif', 'image/svg']}
                filesLimit={10}
                Icon={AddAPhotoSharpIcon}
                maxFileSize={5242880}
                dropzoneText="Drop images here or Click"
                showPreviewsInDropzone={false}
                onChange={props.handleChange}
            />
            <Typography className={classes.limitSubtitle} variant="subtitile1">* Up to 10 images, max 5 MB each.</Typography>
        </>
    )
}