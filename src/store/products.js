import { useReducer, useEffect } from "react";
import { toast } from "react-toastify";

// Default fresh produce products
const defaultProducts = [
  {
    _id: "1",
    name: "Fresh Organic Carrots",
    description: "Sweet and crunchy farm-fresh organic carrots.",
    price: 3,
    rating: 5,
    product_image: "/assets/images/carrots.jpg",
    addedToCart: false,
  },
  {
    _id: "2",
    name: "Juicy Red Apples",
    description: "Crisp and juicy apples, rich in flavor and nutrients.",
    price: 5,
    rating: 4,
    product_image: "/assets/images/apples.jpg",
    addedToCart: false,
  },
  {
    _id: "3",
    name: "Organic Broccoli",
    description: "Freshly picked green broccoli, packed with vitamins.",
    price: 4,
    rating: 5,
    product_image: "/assets/images/broccoli.jpg",
    addedToCart: false,
  },
  {
    _id: "4",
    name: "Farm Fresh Tomatoes",
    description: "Ripe, juicy tomatoes straight from the farm.",
    price: 6,
    rating: 4,
    product_image: "/assets/images/tomatoes.jpg",
    addedToCart: false,
  },
  {
    _id: "5",
    name: "Sweet Bananas",
    description: "Perfectly ripe bananas, great for snacks or smoothies.",
    price: 2,
    rating: 5,
    product_image: "/assets/images/bananas.jpg",
    addedToCart: false,
  },
];

// Initialize products in localStorage if empty
if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify(defaultProducts));
}

const initialState = {
  products: JSON.parse(localStorage.getItem("products")) || [],
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  cartTotal: 0,
  cartQuantity: 0,
};

const actions = {
  ADD_TO_CART: "ADD_TO_CART",
  GET_PRODUCTS: "GET_PRODUCTS",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAR_CART: "CLEAR_CART",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
};

const calculateCartTotals = (cart) => {
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  return { cartTotal, cartQuantity };
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.GET_PRODUCTS:
      return { ...state, products: action.products };

    case actions.ADD_TO_CART: {
      const product = state.products.find((p) => p._id === action.productId);
      if (!product) return state;

      const updatedCart = [...state.cart, { ...product, quantity: 1, addedToCart: true }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return { ...state, cart: updatedCart, ...calculateCartTotals(updatedCart) };
    }

    case actions.REMOVE_FROM_CART: {
      const updatedCart = state.cart.filter((p) => p._id !== action.productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return { ...state, cart: updatedCart, ...calculateCartTotals(updatedCart) };
    }

    case actions.UPDATE_QUANTITY: {
      const updatedCart = state.cart.map((p) =>
        p._id === action.productId ? { ...p, quantity: action.quantity } : p
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return { ...state, cart: updatedCart, ...calculateCartTotals(updatedCart) };
    }

    case actions.CLEAR_CART:
      localStorage.setItem("cart", JSON.stringify([]));
      return { ...state, cart: [], cartTotal: 0, cartQuantity: 0 };

    default:
      return state;
  }
};

const useStore = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    dispatch({ type: actions.GET_PRODUCTS, products });
  }, []);

  const addToCart = (productId) => {
    dispatch({ type: actions.ADD_TO_CART, productId });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: actions.REMOVE_FROM_CART, productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return removeFromCart(productId);
    dispatch({ type: actions.UPDATE_QUANTITY, productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: actions.CLEAR_CART });
  };

  const confirmOrder = () => {
    toast.success("Order placed successfully!");
    clearCart();
  };

  return {
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    confirmOrder,
  };
};

export default useStore;
