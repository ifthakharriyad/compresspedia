import { DropzoneArea } from 'material-ui-dropzone';
import AddAPhotoSharpIcon from '@material-ui/icons/AddAPhotoSharp';
import  Typography  from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(()=>({
    limitSubtitle:{
        padding:"20px",
        color:"#40444f",
        fontWeight:"400"
    },
    container:{
        border:"2px dashed black",
        borderRadius:"14px",
        minHeight:"165px",
        maxHeight:"165px"
    },
    paragraph:{
        margin: ".8rem .5rem 1.2rem",
        fontWeight:"500",
        fontSize:"1.2rem",
        lineHeight:"2rem",
        color:"black"
    },
    dropZoneContainer:{
        marginTop:"3.5em",
        marginBottom:"3.5em",
        maxHeight:"165px"
      }
}))

export default function DropZone(props){
    const classes = useStyles()
    return(
        <Container id="compress" maxWidth="xs" className={classes.dropZoneContainer} fixed>
            <DropzoneArea
                acceptedFiles={['image/jpeg','image/jpg','image/png', 'image/gif', 'image/svg']}
                filesLimit={10}
                Icon={AddAPhotoSharpIcon}
                maxFileSize={5242880}
                dropzoneText="Drop JPG, PNG, GIF or Click"
                showPreviewsInDropzone={false}
                onChange={props.handleChange}
                dropzoneClass={classes.container}
                dropzoneParagraphClass={classes.paragraph}
            />
            <Typography className={classes.limitSubtitle} variant="subtitle2">* Up to 10 images, max 5 MB each.</Typography>

        </Container>
    )
}