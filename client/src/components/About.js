import  Grid  from "@material-ui/core/Grid";
import  Container  from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { Trans } from '@lingui/macro'

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
            <Typography className={classes.headerText} variant="h4" variantMapping="h1"><Trans>Smart Image Compression Made Simple</Trans></Typography>
            <Typography variant="subtitle1"><Trans>Compress JPG, PNG, SVG, and GIF in one place for free</Trans></Typography>
            </ div>
            <Grid container spacing={2} className={classes.faqGrid}>
                <Grid item xs={12} >
                    <Typography variant="h6"><Trans>What does CompressPedia do?</Trans></Typography>
                    <Typography variant="body1"><Trans>
                    We reduce the size of your .JPEG, .PNG, GIF, SVG Images by compressing the file without compromising the quality of your image. 
                    </Trans>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6"><Trans>How does CompressPedia work?</Trans></Typography>
                    <Typography variant="body1">
                    <Trans>
                    At CompressPedia we use the latest State of the Art Algorithm to Compress .JPEG, .PNG, GIF, SVG Image files. Simply we reduce the Image size, so it will use minimum bandwidth and load faster.
                    </Trans>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6"><Trans>What can I compress?</Trans></Typography>
                    <Typography variant="body1">
                    <Trans>
                    You can Compress .JPEG, .PNG, GIF, SVG
                    </Trans>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6"><Trans>Do you keep my data once I compress the Image?</Trans></Typography>
                    <Typography variant="body1">
                    <Trans>
                    We do not even touch your data. Only you know what you are compressing. At Compresspedia our Algorithm design to make sure your data is yours and not store any of data with us
                    </Trans>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6"><Trans>Is it free to Compress images?</Trans></Typography>
                    <Typography variant="body1">
                    <Trans>
                    YES! YES! YES! and we are making sure you can Compress Images Free forever.
                    </Trans>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6"><Trans>How many Images can Compress and what size?</Trans></Typography>
                    <Typography variant="body1">
                    <Trans>
                    Hooray! You can Compress 20 Images up to 20 MB each at one time.
                    </Trans>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6"><Trans>Are GDPR and Privacy policy in place?</Trans></Typography>
                    <Typography variant="body1">
                    <Trans>
                    We strictly respect and comply with GDPR and user’s privacy policies, but you do not have to worry as we do not save any data or use cookies for UX purposes. If you are visiting our website which means you “accepting” our terms and conditions, simply you can “reject” by leaving our website. Though we will appreciate your feedback and opinion to help us to provide you with a better experience in future.
                    </Trans>
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}
