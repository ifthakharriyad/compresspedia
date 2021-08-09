import React from 'react';
import {useEffect} from 'react'
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import * as Lang from '../modules/Lang'
import { ButtonGroup } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'


const langsObj = Lang.langs;
const langs = Object.values(langsObj);

const useStyles = makeStyles((theme)=>({
    buttonGroup:{
        backgroundColor:"transparent"
    },
    button:{
        color:"white"
    },
    dropDownIcon:{
        color:"white"
    }
}))

export default function LangButton(props) {
    const classes = useStyles();
    let lang = window.localStorage.getItem("lang")
    let currentLang = langsObj[lang]

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [selectedIndex, setSelectedIndex] = React.useState();
  const [selectedLang,setSelectedLang] = React.useState(currentLang);

  useEffect(()=>{
    for(let i=0;i<langs.length;i++){
      if(selectedLang===langs[i]){
        props.onLangChange(Object.keys(langsObj)[i])
      }
    }
  },[selectedLang,props]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setSelectedLang(langs[index]);
    handleClose();
  };

  return (
    <div>
        <ButtonGroup className={classes.buttonGroup}>
        <Button className={classes.button} disableRipple={true} disableFocusRipple>{selectedLang}</Button>
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
        {langs.map((option,index) => (
          <MenuItem key={option} selected={index === selectedIndex} onClick={(event) => handleMenuItemClick(event, index)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}