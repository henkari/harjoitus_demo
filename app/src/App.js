import './App.css';
import FileUpload from './components/FileUpload';
import ListFiles from "./components/ListFiles";
import Accordion from 'react-bootstrap/Accordion';
import React,{useState} from 'react';
function App(){
  
  
  // Initialize the count state with 0
  const [laskuCount, setLaskuCount] = useState(0);
  const [sopimusCount, setSopimusCount] = useState(0);
  // Function to increment the count
 
  const incrementLasku = () => {
    setLaskuCount(laskuCount + 1);
    
  };
  // Function to decrement the count
  const decrementLasku = () => {
  if(laskuCount>0){
      setLaskuCount(laskuCount - 1);
  }
  }

  const incrementSopimus = () => {
    setSopimusCount(sopimusCount + 1);
  };
  // Function to decrement the count
  const decrementSopimus = () => {
    if(sopimusCount>0){
    setSopimusCount(sopimusCount - 1);
  }
  }

  return (
    <div className='app'>
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Laskut<span className="badge">{laskuCount}</span>
        </Accordion.Header>
        <Accordion.Body>
            <FileUpload category='lasku' onFileAdded={incrementLasku} />
            <ListFiles category='lasku' onFileOpened={decrementLasku} />
        </Accordion.Body>
      </Accordion.Item>
      
      <Accordion.Item eventKey="1">
        <Accordion.Header>Sopimukset <span className="badge">{sopimusCount}</span>

        </Accordion.Header>
        <Accordion.Body>
            <FileUpload category='sopimus' onFileAdded={incrementSopimus} />
            <ListFiles category='sopimus' onFileOpened={decrementSopimus} />  
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </div>
  );
}

export default App;
      