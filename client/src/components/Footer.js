import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import  Paper  from '@material-ui/core/Paper';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Compresspedia
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
    
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    textAlign:"center",
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  footerLogo:{
    height:"100%"
  },
  footerPaper:{
    textAlign:"center"
  }

}));

const footers = [
  {
    title: 'Navigation',
    description: [["Home","/"], ["About","#about"], ["Contact","mailto:contact@compresspedia.com"]],
  },
  {
    title: 'Formats',
    description: [["JPG","/"], ["PNG","/"], ["GIF","/"], ["SVG","/"]],
  }
];

export default function Pricing() {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Grid container spacing={5} justify="space-evenly">
          <Grid item justify="center" alignItems="center" container xs={6} sm={3} key="logo">
            <Grid item>
            <Paper className={classes.footerPaper} elevation={0}>
              <Typography variant="h5">Compresspedia</Typography>
              <Typography variant="caption">Compress Images, PDF, Video online for free</Typography>
            </Paper>
            </Grid>
            
            
          </Grid>
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography  variant="h6" color="textPrimary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map(item => (
                  <li key={item[0]}>
                    <Link href={item[1]} variant="subtitle1" color="textSecondary">
                      {item[0]}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}