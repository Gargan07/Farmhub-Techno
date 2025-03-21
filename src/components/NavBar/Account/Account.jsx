import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext"; // Import global context
import "./Account.css";

const Account = () => {
  const { auth, store, modal } = useGlobalContext(); // Get context values safely

  // Retrieve logged-in user from local storage
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const cartTotal = store?.state?.cartQuantity || 0; // Prevents crash if store.state is undefined

  const handleShowModal = () => modal?.openModal && modal.openModal(false);
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    if (auth?.setState) {
      auth.setState({ user: null }); // Simulate logout
    }
  };

  return (
    <div className="account">
      <div className="cart">
        <Link to="/cart" className="contains-link-to-accounts">
          {user ? (
            <span className="account-user">{user.username}</span>
          ) : (
            <span className="account-user">Guest</span>
          )}
          <span className="account-details">
            <FaShoppingCart />
            <span className="items-in-cart">{cartTotal}</span>
          </span>
        </Link>
      </div>
      <div className="login">
        {user ? (
          <button className="btn-rounded small-rounded" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="btn-rounded small-rounded" onClick={handleShowModal}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Account;
