import { useState, useEffect } from "react";
import Modal from "../UI/Modal";
import classes from "./AddProductForm.module.css";
import axios from "axios";

const AddProductForm = () => {
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState();
  const [productImage, setProductImage] = useState("");
  const [productCatogry, setProductCatogry] = useState()
  const [productSubCatogry, setProductSubCatogry] = useState()
  // const [categoryName, setCategoryName] = useState()

  //Filter Categories

  // const [filterCategoryName, setFilterCategoryName] = useState([])
  // const [filterSubCategory, setFilterSubCategory] = useState([])
  
  // console.log(productCatogry)
  // console.log(productSubCatogry)
  
  function hideFormHandler() {
    setShowAddProductForm(false);
  }
  
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  
  
  useEffect(() => {
    axios.get("http://localhost:3001/api/category").then((response) => {
      // console.log(response.data);
      setCategories(response.data);
    });
  }, []);
  
  useEffect(() => {
    axios.get("http://localhost:3001/api/category/subcategory").then((response) => {
      // console.log(response.data);
      setSubCategories(response.data);
    });
  }, []);

  //============================================================
  
  const addProductHandler = (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('image', productImage);
    data.append('name', productName);
    data.append('description', productDescription)
    data.append('price', productPrice)
    data.append('category', productCatogry)
    data.append('subCategory', productSubCatogry)

    // const productData = {
    //   name: productName,
    //   description: productDescription,
    //   price: productPrice,
    //   images: formdata,
    // };
    
    console.log(data);
    
    axios
    .post("http://localhost:3001/api/product", data,{
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
    
    setShowAddProductForm(false);
  };

  //============================================================

  // useEffect(() =>{

  //   subCategories.filter(cat => {
  //    if(cat.parent === productCatogry)
  //    filterSubCategory.push(cat)
  //  })
  
  //    console.log(filterSubCategory)
  // },[productCatogry])

  


  const submitHandler = () =>{
   setShowAddProductForm(true)

   }

  return (
    <div>
      <div className={classes.btnStyle}>
        <button
          className={classes.addProBtn}
          onClick={submitHandler}
          >
          + Add Product
        </button>
      </div>
      {showAddProductForm && (
        <Modal onClose={hideFormHandler}>
          <form onSubmit={addProductHandler}>
            <div className={classes.divHead}>
              <h3>Add Product</h3>
            </div>
            <div className={classes.inputFields}>
              <label>Name</label>
              <input
                type="text"
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
              />
              <label>Description</label>
              <textarea
                rows="5"
                type="textarea"
                onChange={(e) => {
                  setProductDescription(e.target.value);
                }}
              />
              <label>Price</label>
              <input
                type="number"
                onChange={(e) => {
                  setProductPrice(e.target.value);
                }}
              />
            </div>
            <div
              className={classes.divCatLabel}
              style={{ justifyContent: "space-between" }}
            >
              <div className={classes.inputFields}>
                <label>Category</label>
                <select
                    onChange={(e) => setProductCatogry(e.target.value)}
                  >
                    <option>None</option>
                    {categories.map((category) => {
                      return (
                        <option key={category._id}>{category.name}</option>
                      );
                    })}
                  </select>
              </div>
              <div className={classes.inputFields}>
                <label>Sub Category</label>
                <select
                    onChange={(e) => setProductSubCatogry(e.target.value)}
                  >
                    <option>None</option>
                    {subCategories.map(category =>{
                      return <option key={category._id}>{category.name}</option>
                    })}
                  </select>
              </div>
              <div className={classes.inputFields}>
                <button className={classes.btnUpload}>Upload Image</button>
                <input
                  multiple={false}
                  accept=".jpg, .jpeg"
                  type="file"
                  className={classes.imgInput}
                  id="file"
                  onChange={(e) => setProductImage(e.target.files[0])}
                />
              </div>
            </div>
            <div className={classes.btnAction}>
              <button className={classes.cancelBtn} onClick={hideFormHandler} type='button'>Cancel</button>
              <button className={classes.productBtn}>
                Add Product
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
export default AddProductForm;
