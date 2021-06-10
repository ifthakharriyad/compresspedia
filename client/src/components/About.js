import  Grid  from "@material-ui/core/Grid";
import  Container  from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const createStyles = makeStyles({
    header:{
        marginTop:"4.9em",
        marginBottom:"3em"
    },
    headerText:{
        marginBottom:".5em"
    },
    faqGrid:{
        textAlign:"left"
    }
})

export default function About(){
    const classes=createStyles()
    return(
        <Container maxWidth="md" id="about" >
            < div className={classes.header}>
            <Typography className={classes.headerText} variant="h4" variantMapping="h1">Smart Image Compression Made Simple</Typography>
            <Typography variant="subtitle1">Compress JPG, PNG, SVG, and GIF in one place for free</Typography>
            </ div>
            <Grid container spacing={2} className={classes.faqGrid}>
                <Grid item >
                    <Typography variant="h6">What does CompressPedia do?</Typography>
                    <Typography variant="body1">
                    We reduce the size of your .JPEG, .PNG, GIF, SVG Images by compressing the file without compromising the quality of your image. 
                    </Typography>
                </Grid>
                <Grid item >
                    <Typography variant="h6">How does CompressPedia work?</Typography>
                    <Typography variant="body1">
                    At CompressPedia we use the latest State of the Art Algorithm to Compress .JPEG, .PNG, GIF, SVG Image files. Simply we reduce the Image size, so it will use minimum bandwidth and load faster.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h6">What can I compress?</Typography>
                    <Typography variant="body1">
                    You can Compress .JPEG, .PNG, GIF, SVG
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h6">Do you keep my data once I compress the Image?</Typography>
                    <Typography variant="body1">
                    We do not even touch your data. Only you know what you are compressing. At Compresspedia our Algorithm design to make sure your data is yours and not store any of data with us
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h6">Is it free to Compress images?</Typography>
                    <Typography variant="body1">
                    YES! YES! YES! and we are making sure you can Compress Images Free forever.
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h6">How many Images can Compress and what size?</Typography>
                    <Typography variant="body1">
                    Hooray! You can Compress 10 Images up to 5 MB each at one time.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}
