import React from 'react';
import {useEffect} from 'react'
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { ButtonGroup, Container, Grid, Typography } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles((theme)=>({
    buttonGroup:{
    },
    button:{
        color:"black"
    },
    dropDownIcon:{
        color:"black"
    }
}))

export default function FileTypeButton(props) {
    const classes = useStyles();
    const types = props.types;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [selectedIndex, setSelectedIndex] = React.useState(props.currentTypeIndex);

  useEffect(()=>{
    for(let i=0;i<types.length;i++){
      if(selectedIndex===i){
        props.handleFileSelect(i);
      }
    }
  },[selectedIndex]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    handleClose();
  };

  return (
    <Container justifycontent='center' alignitems='center'>
      <Typography variant='h5' gutterBottom>I want to Compress </Typography>

      <ButtonGroup className={classes.buttonGroup}>
        <Button className={classes.button} disableRipple={true} disableFocusRipple>{types[selectedIndex]}</Button>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <ArrowDropDownIcon className={classes.dropDownIcon} />
      </IconButton>
        </ButtonGroup>
       
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 306,
            width: '18ch',
          },
        }}
      >
        {types.map((option,index) => (
          <MenuItem key={option} selected={index === selectedIndex} onClick={(event) => handleMenuItemClick(event, index)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Container>
  )}