import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddSharpIcon from '@material-ui/icons/AddSharp';

const createStyles = makeStyles(theme=>({
    paper:{
        padding:"50px"
    },
    heartIcon:{
        fontSize:"6em",
        marginBottom:".1em"
    },
    button:{
        marginTop:"1.5em",
        marginBottom:"1.5em"
    }
}))

export default function Thanks(){
    const classes = createStyles()
    return(
        <Paper elevation={0} square className={classes.paper}>
            <FavoriteSharpIcon className={classes.heartIcon}/>
            <Typography variant='h5'>Thanks for using Compresspedia!!</Typography>
            <Typography variant='body1'>Your download should start autometically.</Typography>
            <Button
                href="/"
                variant="contained"
                className={classes.button}
                startIcon={<AddSharpIcon/>}
            >Compress More</Button>
        </Paper>
    )
}