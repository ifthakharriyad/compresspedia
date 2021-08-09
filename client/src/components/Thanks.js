import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddSharpIcon from '@material-ui/icons/AddSharp';
import Container from '@material-ui/core/Container'
import { Trans } from '@lingui/macro';

const createStyles = makeStyles(theme=>({
    paper:{
        padding:"50px"
    },
    heartIcon:{
        fontSize:"6.5em",
        marginBottom:".1em",
        color:'red'
    },
    button:{
        marginTop:"1.5em",
        marginBottom:"1.5em"
    },
    dropZoneContainer:{
        marginTop:"1em",
        marginBottom:"4.5em",
      }
}))

export default function Thanks(){
    const classes = createStyles()
    return(
    <Container id="compress" maxWidth="sm" className={classes.dropZoneContainer}>
        <Paper elevation={0} square className={classes.paper}>
            <FavoriteSharpIcon className={classes.heartIcon}/>
            <Typography variant='h5'><Trans>Thanks for using Compresspedia!!</Trans></Typography>
            <Typography variant='body1'><Trans>The file will download automatically.</Trans></Typography>
            <Button
                href="/"
                variant="contained"
                className={classes.button}
                startIcon={<AddSharpIcon/>}
            ><Trans>Compress More</Trans></Button>
        </Paper>
    </Container>
    )
}