import { useReducer } from "react";

const initialState = {
  orders: JSON.parse(localStorage.getItem("orders")) || [], // Load from localStorage
  order_to_be_canceled: null,
};

const actions = {
  GET_ORDERS: "GET_ORDERS",
  GET_ORDER_TO_BE_CANCELED: "GET_ORDER_TO_BE_CANCELED",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.GET_ORDERS:
      return { ...state, orders: action.orders };

    case actions.GET_ORDER_TO_BE_CANCELED:
      return { ...state, order_to_be_canceled: action.order_id };

    default:
      return state;
  }
};

const useOrders = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getOrders = (user_id) => {
    // Simulate getting orders from local storage
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const userOrders = storedOrders.filter((order) => order.user_id === user_id);

    dispatch({ type: actions.GET_ORDERS, orders: userOrders });
    return userOrders;
  };

  const setOrderToBeCanceled = (order_id) => {
    dispatch({ type: actions.GET_ORDER_TO_BE_CANCELED, order_id });
  };

  const cancelOrder = (order_id) => {
    let storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // Simulate order cancellation by removing it from storage
    const updatedOrders = storedOrders.filter((order) => order.id !== order_id);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    dispatch({ type: actions.GET_ORDER_TO_BE_CANCELED, order_id: null });
    dispatch({ type: actions.GET_ORDERS, orders: updatedOrders });

    return { success: true, message: `Order #${order_id} has been canceled` };
  };

  return { state, getOrders, setOrderToBeCanceled, cancelOrder };
};

export default useOrders;
