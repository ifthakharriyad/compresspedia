import { DropzoneArea } from 'material-ui-dropzone';
import  Typography  from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import FileTypeButton from './FileTypeButton'

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
        fontSize:"1.2rem !important",
        lineHeight:"2rem",
        color:"black"
    },
    dropZoneContainer:{
        marginTop:"1em",
        marginBottom:"6.5em"
      }
}))

export default function DropZone(props){
    const classes = useStyles()
    return(
        <Container id="compress" maxWidth="xs" className={classes.dropZoneContainer} fixed>
            <FileTypeButton types={props.types} handleFileSelect={props.handleFileSelect} currentTypeIndex={props.currentTypeIndex}/>
            <DropzoneArea
                acceptedFiles={props.accepted}
                filesLimit={props.filesLimit}
                Icon={props.icon}
                maxFileSize={props.maxFileSize}
                dropzoneText={props.dropZoneText}
                showPreviewsInDropzone={false}
                onChange={props.handleChange}
                dropzoneClass={classes.container}
                dropzoneParagraphClass={classes.paragraph}
            />
            <Typography className={classes.limitSubtitle} variant="subtitle2">{props.subtitle}</Typography>
        </Container>
    )
}