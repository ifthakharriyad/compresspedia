import React from 'react';
import {useEffect} from 'react'
import { Container } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ImageSharpIcon from '@material-ui/icons/ImageSharp';
import PictureAsPdfSharpIcon from '@material-ui/icons/PictureAsPdfSharp';
import VideocamSharpIcon from '@material-ui/icons/VideocamSharp';


const useStyles = makeStyles((theme)=>({
    constainer:{
      marginTop:"80px",
      marginBottom:"10px"
    },
    icon:{
      fontSize:"25px"
    }
}))

export default function FileTypeButton(props) {
    const classes = useStyles();

  const [value, setValue] = React.useState(props.currentTypeIndex);
  //const [selectedIndex, setSelectedIndex] = React.useState(props.currentTypeIndex);

  useEffect(()=>{
    props.handleFileSelect(value);
      
  },[value, props]);



  return (
    <Container justifycontent='center' alignitems='center' className={classes.constainer}>
     <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction label="Image" icon={<ImageSharpIcon className={classes.icon}/>} />
      <BottomNavigationAction label="Pdf" icon={<PictureAsPdfSharpIcon className={classes.icon}/>} />
      <BottomNavigationAction label="Video" icon={<VideocamSharpIcon className={classes.icon}/>} />
    </BottomNavigation>
    </Container>
  )}