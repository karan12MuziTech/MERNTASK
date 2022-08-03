import classes from "./Category.module.css";
import { React, useState, useEffect } from "react";
import axios from "axios";
import Modal from "../UI/Modal";


// import {toast} from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';

// toast.configure()

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [showEditCatHandler, setShowEditCatNameHandler] = useState(false);
  const [updatedCategoryName, setUpdatedCategoryName] = useState();
  const [updateCategoryNameId, setUpdateCategoryNameId] = useState();
  
  const [showEditSubCatHandler, setShowEditSubCatNameHandler] = useState(false);
  const [updatedSubCategoryName, setUpdatedSubCategoryName] = useState();
  const [updateSubCategoryNameId, setUpdateSubCategoryNameId] = useState();
  
  const [showDeleteHandler, setShowDeleteHandler] = useState(false);
  
 
  function hideDeleteHandler() {
    setShowDeleteHandler(false);
  }

  const categoryDeleteHandler = (id) => {;
    setShowDeleteHandler(false)
  axios
    .delete(`http://localhost:3001/api/category/${id}`)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));

  }

  function hideFormHandler() {
    setShowEditCatNameHandler(false);
  }

  function hideSubFormHandler() {
    setShowEditSubCatNameHandler(false);
  }

  const editCategoryHandler = (id) => {
    setUpdateCategoryNameId(id);
    setShowEditCatNameHandler(true);
  };

  const editSubCategoryHandler = (id) => {
    setUpdateSubCategoryNameId(id);
    setShowEditSubCatNameHandler(true);
  };

  function updateCateoryHandler() {
    console.log(updateCategoryNameId);
    axios.put(`http://localhost:3001/api/category/${updateCategoryNameId}`, {
      name: updatedCategoryName,
    });
    // toast('Successfully Updated!')
    setShowEditCatNameHandler(false);
    window.location.reload(false)
  }

  function updateSubCateoryHandler() {
    console.log(updateSubCategoryNameId);
    axios.put(`http://localhost:3001/api/category/${updateSubCategoryNameId}`, {
      name: updatedSubCategoryName,
    });
    // toast('Successfully Updated!')
    setShowEditSubCatNameHandler(false);
  }

  // const editCatHandler = (id) => {};

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/category/subcategory")
      .then((response) => {
        // console.log(response.data)
        setSubCategories(response.data);
      });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/api/category").then((response) => {
      // console.log(response.data)
      setCategories(response.data);
    });
  }, []);

  const subCategoryHandler =(category)=>{

    subCategories.filter(subCat => console.log(subCat.parent === category.name))
    // console.log(subCategories.name)

    // subCategories.filter(subCategory => subCategory.parent === category.name) 
    // console.log(category.name)
  }


  return (
    <div className={classes.divMain}>
      <div>
        <h1>Category List</h1>
        <ul>
          {categories.map((category) => {
            return (
              <div key={category._id} className={classes.divCat} onClick={() => subCategoryHandler(category)}>
                <li>{category.name}</li>
                <div>
                  <button
                    onClick={() => editCategoryHandler(category._id)}
                    className={classes.btnEdit}
                  >
                    Edit
                  </button>
                  {showEditCatHandler && (
                    <Modal onClose={hideFormHandler}>
                      <div className={classes.divHead}>
                        <h3>Update Category</h3>
                      </div>
                      <form onSubmit={(e) => e.preventDefault()}>
                        <div className={classes.inputFields}>
                          <label>Category Name</label>
                          <input
                            type="text"
                            onChange={(e) =>
                              setUpdatedCategoryName(e.target.value)
                            }
                          />
                          <div className={classes.btnAction}>
                            <button
                              className={classes.cancelBtn}
                              type="button"
                              onClick={hideFormHandler}
                            >
                              Cancel
                            </button>
                            <button
                              className={classes.btnCategory}
                              type="button"
                              onClick={updateCateoryHandler}
                            >
                              Update Category
                            </button>
                          </div>
                        </div>
                      </form>
                    </Modal>
                  )}
                  <button className={classes.btnDelete} type='button' onClick={() => setShowDeleteHandler(true)}>Delete</button>
                  {showDeleteHandler && (
                    <Modal onClose={hideDeleteHandler}>
                      <div className={classes.divHead}>
                        <h3>Delete Category</h3>
                      </div>
                      <form onSubmit={(e) => e.preventDefault()}>
                        <div className={classes.deleteDiv}>
                        <label className={classes.lblDel}>Are You Sure?</label>
                          <div className={classes.btnDel}>
                            <button
                              className={classes.cancelBtn}
                              type="button"
                              onClick={hideDeleteHandler}
                            >
                              Cancel
                            </button>
                            <button
                              className={classes.btnCategory}
                              type="button"
                              onClick={() => categoryDeleteHandler(category._id)}
                            >
                              Delete Category
                            </button>
                          </div>
                        </div>
                      </form>
                    </Modal>
                  )}
                </div>
              </div>
            );
          })}
        </ul>
      </div>
      <div className={classes.divSub}>
        <h1 className={classes.h1Sub}>Sub Category List</h1>
        <ul>
          {subCategories.map((subCategory) => {
            return (
              <div key={subCategory._id} className={classes.divSubCat}>
                <li>{subCategory.name}</li>
                <div>
                  <button
                    // onClick={() => editCatHandler(category._id)}
                    className={classes.btnEdit}
                    onClick={() => editSubCategoryHandler(subCategory._id)}
                  >
                    Edit
                  </button>
                  {showEditSubCatHandler && (
                    <Modal onClose={hideSubFormHandler}>
                      <div className={classes.divHead}>
                        <h3>Update Sub Category</h3>
                      </div>
                      <form onSubmit={(e) => e.preventDefault()}>
                        <div className={classes.inputFields}>
                          <label>Sub Category Name</label>
                          <input
                            type="text"
                            onChange={(e) =>
                              setUpdatedSubCategoryName(e.target.value)
                            }
                          />
                          <div className={classes.btnAction}>
                            <button
                              className={classes.cancelBtn}
                              type="button"
                              onClick={hideSubFormHandler}
                            >
                              Cancel
                            </button>
                            <button
                              className={classes.btnCategory}
                              type="button"
                              onClick={updateSubCateoryHandler}
                            >
                              Update Sub Category
                            </button>
                          </div>
                        </div>
                      </form>
                    </Modal>
                  )}
                  <button className={classes.btnDelete} onClick={() => setShowDeleteHandler(true)}>Delete</button>
                  {showDeleteHandler && (
                    <Modal onClose={hideDeleteHandler}>
                      <div className={classes.divHead}>
                        <h3>Delete Category</h3>
                      </div>
                      <form onSubmit={(e) => e.preventDefault()}>
                        <div className={classes.deleteDiv}>
                        <label className={classes.lblDel}>Are You Sure?</label>
                          <div className={classes.btnDel}>
                            <button
                              className={classes.cancelBtn}
                              type="button"
                              onClick={hideDeleteHandler}
                            >
                              Cancel
                            </button>
                            <button
                              className={classes.btnCategory}
                              type="button"
                              onClick={() => categoryDeleteHandler(subCategory._id)}
                            >
                              Delete Category
                            </button>
                          </div>
                        </div>
                      </form>
                    </Modal>
                  )}
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Category;
