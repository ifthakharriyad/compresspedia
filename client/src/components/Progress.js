import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const createStyles = makeStyles(theme=>({
    paper:{
        padding:"25px 50px"
    },
    progress:{
        marginBottom:"1em"
    },
    dropZoneContainer:{
        marginTop:"7em",
        marginBottom:"7.5em"
    },
    overline:{
        display:"block",
        marginTop:"100px"
    }
}))

export default function Progress(props){
    const classes = createStyles()
    return(
    <Container id="compress" maxWidth="sm" className={classes.dropZoneContainer}>
        <Paper elevation={0} square className={classes.paper}>
            <CircularProgress className={classes.progress} color="black" size={50} ></CircularProgress>
            <Typography variant='h5'>{props.massage}</Typography>
            {
                (props.fileTypeIndex===2)?
                (
                    <Typography className={classes.overline}  variant="subtitle1" >Note: On average it takes 3-5 minutes per video to compress.</Typography>
                ):null
            }
        </Paper>
    </Container>
    )
}