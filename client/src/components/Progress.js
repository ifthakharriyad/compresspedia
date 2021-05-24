import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const createStyles = makeStyles(theme=>({
    paper:{
        padding:"50px"
    },
    progress:{
        marginBottom:"1em"
    }
}))

export default function Progress(props){
    const classes = createStyles()
    return(
        <Paper elevation={0} square className={classes.paper}>
            <CircularProgress className={classes.progress} color="primary" size={50} ></CircularProgress>
            <Typography variant='h5'>{props.massage}</Typography>
        </Paper>
    )
}