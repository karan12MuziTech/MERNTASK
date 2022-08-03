import axios from "axios";
import { useState, useEffect } from "react";
import Modal from "../UI/Modal";
import classes from "./AddCategoryForm.module.css";

const AddCategoryForm = () => {
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);

  // =======================================
  //  State for Getting Data of Categories
  // =======================================

  const [categories, setCategories] = useState();

  // ===============================
  //  State for Post Category Data
  // ===============================
  const [categoryName, setCategoryName] = useState();
  const [parentCategoryName, setParentCategoryName] = useState();

  function hideFormHandler() {
    setShowAddCategoryForm(false);
  }

  // ================================
  //     Posting Data of Category
  // ================================

  const addCateoryHandler = (e) => {
    e.preventDefault();

    if (parentCategoryName === "None") {
      setParentCategoryName(null);
    }

    const catergoryData = {
      name: categoryName,
      parent: parentCategoryName,
    };

    axios
      .post("http://localhost:3001/api/category", catergoryData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(catergoryData);
    setShowAddCategoryForm(false);
  };

  // ================================
  //     Getting Data of Category
  // ================================

  useEffect(() => {
    axios.get("http://localhost:3001/api/category").then((response) => {
      // console.log(response.data);
      setCategories(response.data);
    });
  }, []);

  
  return (
    <div>
      <div className={classes.btnStyle}>
        <button
          className={classes.addCatBtn}
          onClick={() => setShowAddCategoryForm(true)}
        >
          + Add Category
        </button>
      </div>
      {showAddCategoryForm && (
        <Modal onClose={hideFormHandler}>
          <div className={classes.divHead}>
            <h3>Add Category</h3>
          </div>
          <form onSubmit={addCateoryHandler}>
            <div className={classes.inputFields}>
              <label>Name</label>
              <input
                type="text"
                onChange={(e) => setCategoryName(e.target.value)}
              />
              <div className={classes.divCatLabel}>
                <div className={classes.inputFields}>
                  <label>Category</label>
                  <select
                    onChange={(e) => setParentCategoryName(e.target.value)}
                  >
                    <option>None</option>
                    {categories.map((category) => {
                      return (
                        <option key={category._id}>{category.name}</option>
                      );
                    })}
                  </select>
                </div>
                <div className={classes.btnAction}>
                  <button
                    className={classes.cancelBtn}
                    type="button"
                    onClick={hideFormHandler}
                  >
                    Cancel
                  </button>
                  <button className={classes.btnCategory} type="submit">
                    Add Category
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AddCategoryForm;
