import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

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
        backgroundColor:"black",
        color:"white",
        minHeight:"40px"
      },
      toolbar: {
        flexWrap: 'wrap',
        [theme.breakpoints.down(450)]:{
          paddingLeft:"0px",
          paddingRight:"0px"
        }
      },
      toolbarTitle: {
        fontSize:"1.4em",
        fontWeight:"410",
        flexGrow: 0,
        textAlign:"left",
        [theme.breakpoints.down(700)]: {
            flexGrow:1
        },
        color:"white"
        
      },
      toolbarSubtitle: {
        flexGrow: 1,
        textAlign:"center",
        [theme.breakpoints.down(700)]: {
            display:"none"
        }
      },
      link: {
        margin: theme.spacing(1, 1.5),
        [theme.breakpoints.down(450)]:{
          marginRight:"1px",
          marginLeft:"4px"
        }
      }
}));

export default function NavBar(){
    const classes = useStyles()
    return(
        <AppBar position="sticky" color="black" elevation={0} className={classes.appBar} id="compress">
          <Container maxWidth="md">
            <Toolbar variant="dense" className={classes.toolbar}>
              <Link href="/"  underline="none" className={classes.toolbarTitle}>

                COMPRESSPEDIA
              </Link>
              <Typography variant='subtitle1' color='inherit' noWrap className={classes.toolbarSubtitle}>
                Compress images online free
              </Typography>

            </Toolbar>
          </Container>
      </AppBar>
    )
}