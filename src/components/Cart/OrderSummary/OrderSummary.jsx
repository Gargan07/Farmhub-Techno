import "./OrderSummary.css";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { useState } from "react";
import { toast } from "react-toastify";
import localforage from "localforage";

const OrderSummary = () => {
  const { store, modal, auth } = useGlobalContext();
  const [deliveryType, setDeliveryType] = useState("Standard");
  const [phone, setPhone] = useState("");

  const setDelivery = (type) => setDeliveryType(type);

  const checkOut = async () => {
    if (!phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    let deliveryCost = deliveryType === "Standard" ? 5 : 10;
    let totalCost = store.state.cartTotal + deliveryCost;

    let orderPayload = {
      items: store.state.cart,
      totalItemCount: store.state.cartQuantity,
      deliveryType,
      deliveryCost,
      costBeforeDelivery: store.state.cartTotal,
      totalCost,
      phoneNumber: phone,
      userId: auth.state.user?.id || "guest",
    };

    // Save order locally
    await localforage.setItem("latestOrder", orderPayload);

    // Clear the cart after placing the order
    store.clearCart();
    toast.success("Your order has been placed successfully!");

    // Simulate order confirmation modal
    setTimeout(() => {
      modal.openModal();
    }, 1000);
  };

  return (
    <div className="is-order-summary">
      <div className="sub-container">
        <div className="contains-order">
          <div className="total-cost">
            <h4>Total Items ({store.state.cartQuantity})</h4>
            <h4>₱{store.state.cartTotal.toFixed(2)}</h4>
          </div>
          <div className="shipping">
            <h4>Shipping</h4>
            <select
              className="select-dropdown"
              onChange={(e) => setDelivery(e.target.value)}
            >
              <option value="Standard">Standard</option>
              <option value="Express">Express</option>
            </select>
          </div>
          <div className="promo-code">
            <h4>Promo Code</h4>
            <div className="enter-promo">
              <input className="select-dropdown" type="text" disabled />
              <button className="flat-button apply-promo" disabled>
                Apply
              </button>
            </div>
          </div>
          <div className="promo-code">
            <h4>Phone Number</h4>
            <input
              className="select-dropdown"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <small>
              <em style={{ color: "#ff2100" }}>
                Your number will be used to verify the order.
              </em>
            </small>
          </div>
          <div className="final-cost">
            <h4>Total Cost</h4>
            <h4>₱{store.state.cart.length > 0 ? (store.state.cartTotal + (deliveryType === "Standard" ? 5 : 10)).toFixed(2) : "0.00"}</h4>
          </div>
          <div className="final-checkout">
            <button
              className="flat-button checkout"
              onClick={checkOut}
              disabled={store.state.cartQuantity === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
