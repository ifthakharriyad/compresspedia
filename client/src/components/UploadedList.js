import { useState } from 'react'
import List from '@material-ui/core/List'
import  ListItem  from '@material-ui/core/ListItem'
import  ListItemIcon  from '@material-ui/core/ListItemIcon'
import DoneAllSharpIcon from '@material-ui/icons/DoneAllSharp';
import DoneSharpIcon from '@material-ui/icons/DoneSharp';
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import DoneOutlineTwoToneIcon from '@material-ui/icons/DoneOutlineTwoTone';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import GetAppSharpIcon from '@material-ui/icons/GetAppSharp';
import CloudDoneSharpIcon from '@material-ui/icons/CloudDoneSharp';
import UnfoldLessSharpIcon from '@material-ui/icons/UnfoldLessSharp';
import Container from '@material-ui/core/Container'
import Slider from '@material-ui/core/Slider';
import { Plural, Trans } from '@lingui/macro'
import Progress from './Progress'


const useStyles = makeStyles((theme) => ({
    dropZoneContainer:{
        marginTop:"3.5em",
        marginBottom:"5.5em"
    },
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

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';


const IOSSlider = withStyles({
  root: {
    color: '#000',
    height: 2,
    padding: '10px 0',
    marginTop:"25px",
    marginBottom:"10px"
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    marginTop: -14,
    marginLeft: -14,
    '&:focus, &:hover, &$active': {
      boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 12px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider);

export default function UploadedList(props){
    const classes= useStyles()
    const [open, setOpen] = useState(false);
    const [compressRatio, setCompressRatio] = useState(60)
    const [isCompressed] = useState(props.isCompressed);

    const handleClick = () => {
      setOpen(!open);
    };
    function handleDownload(){
        props.handleDownload();
    }
    function handleCompress(){
      props.handleCompress(compressRatio)
    }
    let s = props.files.length>1? "s ":" "
    return(
        <Container id="compress" maxWidth="sm" className={classes.dropZoneContainer}> 
            
              {
                isCompressed ?
                (
                  <>
                  <Paper elevation={0} square className={classes.paper}>
                  <DoneOutlineTwoToneIcon className={classes.doneIcon}></DoneOutlineTwoToneIcon>
                  <Typography variant='h5'><Trans>Compressed!!</Trans></Typography>
                  <Typography variant='body1'>
                    <Plural
                    value={props.files.length}
                    zero={`No ${props.fileType} compressed!`}
                    one={`# ${props.fileType} compressed successfully!`}
                    other={`# ${props.fileType}${s} compressed successfully`}
                    >

                    </Plural>
                  </Typography>
                  </Paper>
                    <Button className={classes.doneBottun} variant="contained" 
                      size='large'
                      startIcon={<GetAppSharpIcon />}
                      onClick={()=>handleDownload()}
                    >
                      <Trans>Download All</Trans>
                    </Button>
                    </>
                ):
                ( 
                  <>
                  <Paper elevation={0} square className={classes.paper}>
                  <CloudDoneSharpIcon className={classes.doneIcon}></CloudDoneSharpIcon>
                  <Typography variant='h5'><Trans>Uploaded!!</Trans></Typography>
                  <Typography variant='body1'>
                    <Plural
                    value={props.files.length}
                    zero={`No ${props.fileType} uploaded!`}
                    one={`# ${props.fileType} uploaded successfully!`}
                    other={`# ${props.fileType}${s} uploaded successfully`}
                    >

                    </Plural>
                  </Typography>
                  </Paper>
                  <List component="nav">
                  <ListItem className={classes.listItem} button onClick={handleClick}>
                      <ListItemIcon>
                          <DoneAllSharpIcon/>
                      </ListItemIcon>
                      <ListItemText primary={`Uploadedd ${props.fileType}${s}`} />
                      {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                      {
                          props.files.map((file,index)=>(
                              <ListItem key={index} button className={classes.nested}>
                                  <ListItemIcon>
                                      <DoneSharpIcon />
                                  </ListItemIcon>
                                  <ListItemText primary={file.name} />
                              </ListItem>
                          ))
                      }
                      
                      </List>
                  </Collapse>
              
              </List>
              {
                  props.fileType==="image" || "video" ?
                  (
                      <IOSSlider aria-label="ios slider" value={compressRatio} valueLabelDisplay="on" min={props.compLev.min} max={props.compLev.max} onChange={(event,value)=>setCompressRatio(value)}/>
                  ):null
              }
              
              <Button className={classes.doneBottun} variant="contained" 
                      size='large'
                      startIcon={<UnfoldLessSharpIcon />}
                      onClick={()=>handleCompress()}
              >
                  <Trans>Compress</Trans>
              </Button>
              </>
                )
              }
        </Container>
        
    )
}