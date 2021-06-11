import { useState } from 'react'
import List from '@material-ui/core/List'
import  ListItem  from '@material-ui/core/ListItem'
import  ListItemIcon  from '@material-ui/core/ListItemIcon'
import DoneAllSharpIcon from '@material-ui/icons/DoneAllSharp';
import DoneSharpIcon from '@material-ui/icons/DoneSharp';
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import DoneOutlineTwoToneIcon from '@material-ui/icons/DoneOutlineTwoTone';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import Container from '@material-ui/core/Container'


const useStyles = makeStyles((theme) => ({
    listItem:{
        border:"1px solid lightgrey",
        borderRadius:"1px"
    },
    nested: {
      paddingLeft: theme.spacing(4),
      border:"1px solid lightgrey",
      borderRadius:"1px",
      borderTop:"none"
    },
    paper:{
        padding:"25px 50px"
    },
    doneIcon:{
        marginBottom:".3em",
        fontSize:"5em"
    }, 
    doneBottun:{
        margin:"1em"
    }
  }));

export default function UploadedList(props){
    const classes= useStyles()
    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(!open);
    };
    return(
        <Container id="compress" maxWidth="sm" className={classes.dropZoneContainer}> 
            <Paper elevation={0} square className={classes.paper}>
                <DoneOutlineTwoToneIcon className={classes.doneIcon}></DoneOutlineTwoToneIcon>
                <Typography variant='h5'>Compressed!!</Typography>
                <Typography variant='body1'>{props.images.length+" images Compressed Successfully."}</Typography>
            </Paper>
            <List component="nav">
                <ListItem className={classes.listItem} button onClick={handleClick}>
                    <ListItemIcon>
                        <DoneAllSharpIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Compressed Images" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    {
                        props.images.map((image,index)=>(
                            <ListItem key={index} button className={classes.nested}>
                                <ListItemIcon>
                                    <DoneSharpIcon />
                                </ListItemIcon>
                                <ListItemText primary={image.name} />
                            </ListItem>
                        ))
                    }
                    
                    </List>
                </Collapse>
            
            </List>
            <Button className={classes.doneBottun} variant="contained" 
                    size='large'
                    startIcon={<GetAppRoundedIcon />}
                    onClick={props.handleDownload}
            >
                Download
            </Button>
        </Container>
        
    )
}