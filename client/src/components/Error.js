import ErrorOutlineSharpIcon from '@material-ui/icons/ErrorOutlineSharp';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ReplayIcon from '@material-ui/icons/Replay';

const createStyles = makeStyles(theme=>({
    paper:{
        padding:"50px",
        backgroundColor:"#fafafa"
    },
    errorIcon:{
        fontSize:"4em",
        marginBottom:".5em"
    },
    button:{
        marginTop:"1.5em",
        marginBottom:"1.5em"
    }
}))

export default function Error(props){
    const classes = createStyles()
    return(
        <Paper elevation={0} square className={classes.paper}>
            <ErrorOutlineSharpIcon className={classes.errorIcon} color='error'/>
            <Typography variant='h5'>{props.massage}</Typography>
            <Button
                href="/"
                variant="contained"
                className={classes.button}
                startIcon={<ReplayIcon/>}
            >Try again</Button>
        </Paper>
    )
}