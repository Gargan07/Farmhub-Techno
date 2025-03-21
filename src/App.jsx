import { useEffect } from "react";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeView from "./views/HomeView";
import CartView from "./views/CartView";
import DeliveryView from "./views/DeliveryView";
import ErrorView from "./views/ErrorView";
import NavBar from "@/components/NavBar/NavBar";
import ShopFooter from "@/components/Footer/ShopFooter";
import Modal from "./components/Modals/Modal";
import CancelOrder from "./components/Modals/CancelOrder";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { store, modal } = useGlobalContext();

  useEffect(() => {
    if (store?.state?.products?.length === 0 && typeof store?.getProducts === "function") {
      store.getProducts(); // ✅ Call getProducts safely
    }
  }, [store]);

  return (
    <div>
      <BrowserRouter>
        <header>
          <NavBar />
        </header>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/delivery" element={<DeliveryView />} />
          <Route path="*" element={<ErrorView />} />
        </Routes>
        <footer>
          <ShopFooter />
        </footer>
      </BrowserRouter>
      {modal?.opened && (
        <Modal
          header={modal.isRegister ? "Create Account" : "Login"}
          submitAction="/"
          buttonText={modal.isRegister ? "Create Account" : "Login"}
          isRegister={modal.isRegister}
        />
      )}
      {modal?.isCancelModal && <CancelOrder />}
      <ToastContainer />
    </div>
  );
}

export default App;
