import './App.css';
import DropZoneContainer from './components/DropZoneContainer';
import NavBar from './components/NavBar'
import CssBaseline from '@material-ui/core/CssBaseline';
import About from './components/About'
import Footer from './components/Footer'
import {makeStyles} from '@material-ui/core/styles'
import classNames from 'classnames'


const createStyles = makeStyles(theme=>({
  root:{
    backgroundColor:"white",
    textAlign:"center"
  }
}))

function App(props) {
  const classes = createStyles()
  return (
    <div className={classNames(classes.root, 'App')}>
        <CssBaseline/>
        <NavBar onLangChange={props.onLangChange}/>
        <DropZoneContainer/>
        <About/>
        <Footer/>
    </div>
  );
}

export default App;
