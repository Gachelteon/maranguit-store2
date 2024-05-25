import React, { useState, useEffect } from 'react';
import Footer from './footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faMinusCircle, faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { db } from "../config/firebase.js";
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersSnapshot = await getDocs(collection(db, 'orders'));
                const ordersData = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setOrders(ordersData);
                calculateTotalPrice(ordersData);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const calculateTotalPrice = (ordersData) => {
        const total = ordersData.reduce((acc, order) => acc + order.price * order.quantity, 0);
        setTotalPrice(total);
    };

    const removeFromOrder = async (orderId) => {
        try {
            await deleteDoc(doc(db, 'orders', orderId));
            const updatedOrders = orders.filter(order => order.id !== orderId);
            setOrders(updatedOrders);
            calculateTotalPrice(updatedOrders);
        } catch (error) {
            console.error('Error removing from order:', error);
        }
    };

    const incrementQuantity = async (orderId) => {
        try {
            const orderRef = doc(db, 'orders', orderId);
            await updateDoc(orderRef, {
                quantity: orders.find(order => order.id === orderId).quantity + 1
            });
            const updatedOrders = orders.map(order =>
                order.id === orderId ? { ...order, quantity: order.quantity + 1 } : order
            );
            setOrders(updatedOrders);
            calculateTotalPrice(updatedOrders);
        } catch (error) {
            console.error('Error incrementing quantity:', error);
        }
    };

    const decrementQuantity = async (orderId) => {
        try {
            const orderRef = doc(db, 'orders', orderId);
            const currentQuantity = orders.find(order => order.id === orderId).quantity;
            if (currentQuantity > 1) {
                await updateDoc(orderRef, {
                    quantity: currentQuantity - 1
                });
                const updatedOrders = orders.map(order =>
                    order.id === orderId ? { ...order, quantity: order.quantity - 1 } : order
                );
                setOrders(updatedOrders);
                calculateTotalPrice(updatedOrders);
            }
        } catch (error) {
            console.error('Error decrementing quantity:', error);
        }
    };

    return (
        <>
            <div className="orders-container">
                <div className="orders-list-container">
                    <h2 className="orders-name">Your Orders</h2>
                    <div className="orders-list">
                        {orders.map((order) => (
                            <div key={order.id} className="order-card">
                                <div className="order-card-header">
                                    <h3>{order.productName}</h3>
                                    <button className="remove-button" onClick={() => removeFromOrder(order.id)}><FontAwesomeIcon icon={faTimes} /></button>
                                </div>
                                <img src={order.productImage} alt={order.productName} className="order-image" />
                                <div className="order-details">
                                    <p>${order.price}</p>
                                    <div className="quantity">
                                        <button onClick={() => decrementQuantity(order.id)}><FontAwesomeIcon icon={faMinusCircle} /></button>
                                        <span>{order.quantity}</span>
                                        <button onClick={() => incrementQuantity(order.id)}><FontAwesomeIcon icon={faPlusCircle} /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="order-summary">
                    <h3>Order Summary</h3>
                    <p>Price ({orders.length} item): ${totalPrice}</p>
                    <h4>Total Amount: ${totalPrice}</h4>
                    <button className="checkout-button">Checkout</button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Orders;