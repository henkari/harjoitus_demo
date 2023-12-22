import './App.css';
//import FileUpload from './components/FileUpload';
//import ListFiles from './components/ListFiles';
import React, {useState, useEffect} from 'react';
import AddCategory from './components/AddCategory'
import AccordionData from'./components/AccordionData'

function App() {
  const initialCategories = JSON.parse(localStorage.getItem('categories')) || [];
  const [categories, setCategories] = useState(initialCategories);
  
  useEffect(() => {
    // Update localStorage whenever categories change
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addNewCategory = (newCategory) => {
    setCategories((prevCategories) => [
      ...prevCategories,
      { name: newCategory, key: newCategory.toLowerCase() },
    ]);
  };
  const clearCategories = () => {
    setCategories([]);
  };
    return (
      
    <div className='app'>
      <AddCategory addNewCategory={addNewCategory}/>
      <button onClick={clearCategories}>Clear Categories</button>
      
      {categories.map((category, index) => (
        <AccordionData key={category.key} category={category.key} />
      ))}
      
      </div>
  );
}

export default App;
      