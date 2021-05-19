import  {useState, useEffect} from 'react'

import './App.css';
import ImageDropZone from './components/ImageDropZone';

function App() {
  const [time, setTime ] = useState("");
   function updateTime(){
    fetch("/time").then(res=>res.text())
    .then(data => setTime(data))
    .catch(err=>console.log(err))
  }
  useEffect(()=>{
    updateTime()
  })
  return (
    <div className="App">
        <h3>{time}</h3>
        <ImageDropZone/>
    </div>
  );
}

export default App;
