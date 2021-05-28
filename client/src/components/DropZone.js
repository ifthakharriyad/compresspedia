import { DropzoneArea } from 'material-ui-dropzone';
import AddAPhotoSharpIcon from '@material-ui/icons/AddAPhotoSharp';
import  Typography  from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles(()=>({
    limitSubtitle:{
        padding:"20px"
    },
    container:{
        borderColor:"black",
        width:"375px",
        height:"165px",
        minHeight:"165px",
        borderRadius:"14px"
    },
    paragraph:{
        margin: ".8rem .5rem 1.2rem",
        fontWeight:"600",
        fontSize:"1.3rem",
        lineHeight:"2rem"
    },
    dropZoneContainer:{
        marginTop:"3em",
        marginBottom:"3em"
      }
}))

export default function DropZone(props){
    const classes = useStyles()
    return(
        <Container id="compress" maxWidth="xs" className={classes.dropZoneContainer}>
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
            <Typography className={classes.limitSubtitle} variant="subtitile1">* Up to 10 images, max 5 MB each.</Typography>
        </Container>
    )
}