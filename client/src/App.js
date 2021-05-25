import './App.css';
import DropZoneContainer from './components/DropZoneContainer';
import NavBar from './components/NavBar'
import CssBaseline from '@material-ui/core/CssBaseline';
import About from './components/About'
import Footer from './components/Footer'
import {makeStyles} from '@material-ui/core/styles'

const createStyles = makeStyles({
  app:{
    backgroundColor:"white"
  }
})

function App() {
  const classes = createStyles()
  return (
    <div className="App" className={classes.app}>
        <CssBaseline/>
        <NavBar/>
        <DropZoneContainer/>
        <About/>
        <Footer/>
    </div>
  );
}

export default App;
