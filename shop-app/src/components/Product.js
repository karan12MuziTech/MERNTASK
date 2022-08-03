import image from "../UI/iPhone.jpeg";
import classes from "./Product.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../UI/Modal";

const Product = () => {
  const [proucts, setProducts] = useState([]);
  const [editFormHandler, setEditFormHandler] = useState(false);

  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState();
  const [productImage, setProductImage] = useState("");
  const [productCatogry, setProductCatogry] = useState();
  const [productSubCatogry, setProductSubCatogry] = useState();
  const [productId, setEditProductId] = useState()

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [deleteProduct,showDeleteProduct] = useState(false)
  const [showDeleteHandler, setShowDeleteHandler] = useState(false)

  function hideFormHandler() {
    setEditFormHandler(false);
  }

  function hideDeleteHandler(){
    showDeleteProduct(false);
  }

  const updateProductHandler = (e) => {

    e.preventDefault();

    const data = new FormData();
    data.append('image', productImage);
    data.append('name', productName);
    data.append('description', productDescription)
    data.append('price', productPrice)
    data.append('category', productCatogry)
    data.append('subCategory', productSubCatogry)

    axios.put(`http://localhost:3001/api/product/${productId}`,data,{
     headers:{
      'Content-Type': 'multipart/form-data'
     }
    });
    setEditFormHandler(false)
  };

  useEffect(() => {
    axios.get("http://localhost:3001/api/product").then((response) => {
      console.log(response.data);
      setProducts(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/api/category").then((response) => {
      // console.log(response.data)
      setCategories(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/category/subcategory")
      .then((response) => {
        // console.log(response.data);
        setSubCategories(response.data);
      });
  }, []);


  const productDeleteHandler = (id) =>{
    setShowDeleteHandler(false)
    axios
    .delete(`http://localhost:3001/api/category/${id}`)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
  }

  return (
    <div className={classes.mainDiv}>
      {proucts.map((product) => (
        <div key={product._id}>
          <div className={classes.divProduct}>
            <div className={classes.divHead}>
              <h3>{product.name}</h3>
            </div>
            <div className={classes.divImg}>
              <img src={`http://localhost:3001/${product.images}`} />
            </div>
            <div className={classes.divDes}>
              <label style={{ color: "GrayText" }}>{product.description}</label>
              <label>Rs. {product.price}</label>
              <div className={classes.btnAction}>
                <button
                  className={classes.btnEdit}
                  type="button"
                  onClick={() => setEditFormHandler(true)}
                >
                  Edit
                </button>
                {editFormHandler && (
                  <Modal onClose={hideFormHandler}>
                    <form onSubmit={updateProductHandler}>
                      <div className={classes.divHead}>
                        <h3>Edit Product</h3>
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
                                <option key={category._id}>
                                  {category.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className={classes.inputFields}>
                          <label>Sub Category</label>
                          <select
                            onChange={(e) =>
                              setProductSubCatogry(e.target.value)
                            }
                          >
                            <option>None</option>
                            {subCategories.map((category) => {
                              return (
                                <option key={category._id}>
                                  {category.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                        <div className={classes.inputFields}>
                          <label>Choose Image</label>
                          <input
                            style={{ marginTop: "1rem" }}
                            multiple={false}
                            accept=".jpg, .jpeg"
                            type="file"
                            className={classes.imgInput}
                            id="file"
                            onChange={(e) => setProductImage(e.target.files[0])}
                          />
                        </div>
                      </div>
                      <div className={classes.actionBtn}>
                        <button
                          className={classes.cancelBtn}
                          onClick={hideFormHandler}
                          type="button"
                        >
                          Cancel
                        </button>
                        <button className={classes.productBtn} onClick={() => setEditProductId(product._id)}>
                          Edit Product
                        </button>
                      </div>
                    </form>
                  </Modal>
                )}
                <button className={classes.btnDelete} type="button" onClick={() => showDeleteProduct(true)}>
                  {deleteProduct &&
                    <Modal onClose={() => showDeleteProduct(false)}>
                    <div className={classes.divHead}>
                      <h3>Delete Product</h3>
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
                            onClick={() => productDeleteHandler(product._id)}
                          >
                            Delete Category
                          </button>
                        </div>
                      </div>
                    </form>
                  </Modal>
                  }
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
