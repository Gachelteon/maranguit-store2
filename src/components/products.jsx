import React, { useState, useEffect } from "react";
import Footer from "./footer";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { db } from "../config/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function Products() {
  const [products, setProducts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          productName: doc.data().productName,
          price: doc.data().price,
          productImage: doc.data().productImage
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const SuccessMessage = () => (
    <div className="success-message" style={{ display: 'flex', alignItems: 'center' }}>
      <CheckCircleIcon className="success-icon" style={{ marginRight: '8px' }} />
      Item added to cart
    </div>
  );

  const WarningMessage = () => (
    <div className="warning-message">
      <span>Item already added to the cart</span>
    </div>
  );

  const addToCart = async (product) => {
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const orders = querySnapshot.docs.map(doc => doc.data());
      const existingOrder = orders.find(order => order.productName === product.productName);
      if (existingOrder) {
        setSnackbarMessage(<WarningMessage />);
        setSnackbarOpen(true);
      } else {
        await addDoc(collection(db, "orders"), {
          productName: product.productName,
          price: product.price,
          productImage: product.productImage,
          quantity: 1
        });
        setSnackbarMessage(<SuccessMessage />);
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };

  return (
    <>
      <div className="product-container">
        <h2 className="product-name">
          Clothing
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            message={snackbarMessage}
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleSnackbarClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          />
        </h2>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product">
              <img
                src={product.productImage}
                alt={product.productName}
                className="product-image"
              />
              <h3 className="product-title">{product.productName}</h3>
              <p className="product-price">${product.price}</p>
              <div className="icons">
                <button
                  className="cart-button"
                  onClick={() => addToCart(product)}
                >
                  <AddShoppingCartIcon className="cart-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Products;