import { useEffect, useState } from "react";
import localforage from "localforage";
import OrderDetails from "./OrderDetails/OrderDetails";
import OrderSummary from "./OrderSummary/OrderSummary";
import EmptyState from "./EmptyState/EmptyState";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import "./Order.css";

const Order = () => {
  const { store } = useGlobalContext();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Load cart from local storage
    localforage.getItem("cart").then((savedCart) => {
      if (savedCart) {
        store.setCart(savedCart);
        setCart(savedCart);
      }
    });
  }, []);

  return (
    <div className="main-order-container">
      <div className="view-order">
        <div className="order-title">
          <h2>Order</h2>
          <h2>{cart.length} Items</h2>
        </div>
        <div className="order-container">
          {cart.length > 0 ? (
            cart.map((product) => (
              <OrderDetails key={product._id} product={product} />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
      <div className="order-summary">
        <h2>Order Summary</h2>
        <OrderSummary />
      </div>
    </div>
  );
};

export default Order;
