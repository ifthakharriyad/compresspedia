import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    '@global': {
        ul: {
          margin: 0,
          padding: 0,
          listStyle: 'none',
        },
      },
      appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
      toolbar: {
        flexWrap: 'wrap',
      },
      toolbarTitle: {
        flexGrow: 0,
        textAlign:"left",
        [theme.breakpoints.down(600)]: {
            flexGrow:1
        }
      },
      toolbarSubtitle: {
        flexGrow: 1,
        textAlign:"center",
        [theme.breakpoints.down(600)]: {
            display:"none"
        }
      },
      link: {
        margin: theme.spacing(1, 1.5),
      }
}));

export default function NavBar(){
    const classes = useStyles()
    return(
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Compresspedia
          </Typography>
          <Typography variant='subtitle1' color='inherit' noWrap className={classes.toolbarSubtitle}>
              Compress images online free
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              About
            </Link>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Contact Us
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
    )
}