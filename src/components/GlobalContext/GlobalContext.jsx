import { createContext, useContext } from "react";
import useStore from "../../store/products"; // Uses Local Storage / IndexedDB
import useAuth from "../../store/auth"; // Uses Local Storage for Auth
import useModal from "../../store/modal";
import useOrders from "../../store/orders"; // Stores orders offline

// Create Global Context
const GlobalContext = createContext();

// Custom Hook for Using Global Context
export const useGlobalContext = () => useContext(GlobalContext);

// Context Provider Component
export const GlobalProvider = ({ children }) => {
  const store = useStore();  // Manages local products & cart (IndexedDB / Local Storage)
  const auth = useAuth();    // Handles authentication locally
  const modal = useModal();  // Controls UI modals
  const orders = useOrders(); // Manages orders (offline)

  return (
    <GlobalContext.Provider value={{ store, auth, modal, orders }}>
      {children}
    </GlobalContext.Provider>
  );
};
