import React, {useState} from 'react'
function AddCategory({addNewCategory}) {
    
const [input, setInput]=useState('')

const newCategory=(e)=>{
 setInput(e.target.value)
}
const addCategory = () => {
  if (input.trim() !== '') {
    addNewCategory(input);
    
    setInput(''); // Clear input after adding category
  }
  
};
return (
<div>
<input type="text" value={input} onChange={newCategory}/>
<input type="button" onClick={addCategory} />
</div>
)
}
export default AddCategory;