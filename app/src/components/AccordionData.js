import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import FileUpload from './FileUpload';
import ListFiles from './ListFiles';
function AccordionData({category}){
  const heading = category.charAt(0).toUpperCase()+category.slice(1);
    return(
    <div className='accordion'>
      <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{heading}<span className="badge">{0}</span>
        </Accordion.Header>
        <Accordion.Body>
            <FileUpload category={category}/>
          <ListFiles category={category} />  
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>
      
     </div>
    )
}

export default AccordionData;

