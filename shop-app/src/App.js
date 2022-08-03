import classes from './App.module.css'
import Category from './components/Category';
import AddCategoryForm from './components/AddCategoryForm';
import AddProductForm from './components/AddProductForm';
import Images from './components/Images';
import Product from './components/Product';

function App() {
  return (
      <div>
      <div className={classes.btnStyle}>
      <AddCategoryForm/>
      <AddProductForm/>
      </div>
      <Category/>
      {/* <Images/> */}
      <Product/>
    </div>
  );
}

export default App;
