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
            <Grid container spacing={4} className={classes.faqGrid}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">What does Compresspedia do?</Typography>
                    <Typography variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla at volutpat diam ut venenatis. Sed nisi lacus sed viverra tellus in hac habitasse platea. Mattis enim ut tellus elementum sagittis vitae. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet est placerat in egestas erat imperdiet sed euismod. Nisi vitae suscipit tellus mauris a. Eu consequat ac felis donec et odio pellentesque. Ultricies leo integer malesuada nunc vel risus. In fermentum et sollicitudin ac orci phasellus egestas. 
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">Why should I use Compresspedia?</Typography>
                    <Typography variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla at volutpat diam ut venenatis. Sed nisi lacus sed viverra tellus in hac habitasse platea. Mattis enim ut tellus elementum sagittis vitae. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet est placerat in egestas erat imperdiet sed euismod. Nisi vitae suscipit tellus mauris a. Eu consequat ac felis donec et odio pellentesque. Ultricies leo integer malesuada nunc vel risus. In fermentum et sollicitudin ac orci phasellus egestas. 
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">Why should I use Compresspedia?</Typography>
                    <Typography variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla at volutpat diam ut venenatis. Sed nisi lacus sed viverra tellus in hac habitasse platea. Mattis enim ut tellus elementum sagittis vitae. Risus nullam eget felis eget nunc lobortis mattis aliquam faucibus. Sit amet est placerat in egestas erat imperdiet sed euismod. Nisi vitae suscipit tellus mauris a. Eu consequat ac felis donec et odio pellentesque. Ultricies leo integer malesuada nunc vel risus. In fermentum et sollicitudin ac orci phasellus egestas. 
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}