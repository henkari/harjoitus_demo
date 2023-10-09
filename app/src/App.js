import './App.css';
import FileUpload from './components/FileUpload';
import ListFiles from './components/ListFiles';
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';


function App(){
  

  return (
      
    <div className='app'>
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Laskut<span className="badge">{0}</span>
        </Accordion.Header>
        <Accordion.Body>
        <FileUpload category="lasku"/>
        <ListFiles category="lasku" />  
        </Accordion.Body>
      </Accordion.Item>
      
      <Accordion.Item eventKey="1">
        <Accordion.Header>Sopimukset <span className="badge">{0}</span>

        </Accordion.Header>
        <Accordion.Body>
            <FileUpload category="sopimus" />
            <ListFiles category="sopimus" /> 
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </div>
  );
}

export default App;
      