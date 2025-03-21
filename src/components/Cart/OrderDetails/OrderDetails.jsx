import "./OrderDetails.css";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";

const OrderDetails = ({ product }) => {
  const { store } = useGlobalContext();

  return (
    <div className="order-details">
      <div className="order-detail">
        <div className="left-side">
          <img
            src={product.product_image || "/fallback-image.png"}
            alt={product.name || "Product"}
          />
        </div>
        <div className="right-side">
          <h3>{product.name}</h3>
          <p>{product.description || "No description available."}</p>
        </div>
      </div>
      <div className="order-price">
        <h3>₱{product.price.toFixed(2)}</h3>
      </div>
      <div className="quantity">
        <p>Quantity</p>
        <div className="increase-quantity">
          <button onClick={() => store.reduceQuantity(product._id)}>-</button>
          <p>{product.quantity}</p>
          <button onClick={() => store.addQuantity(product._id)}>+</button>
        </div>
      </div>
      <div className="remove">
        <button onClick={() => store.removeFromCart(product._id)}>Remove</button>
      </div>
    </div>
  );
};

export default OrderDetails;
