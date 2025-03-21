import { Link, useLocation } from "react-router-dom";

const Links = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const scrollToProducts = (event) => {
    event.preventDefault(); // Prevent default navigation

    if (!isHomePage) {
      window.location.href = "/#products"; // Redirect if not on home page
      return;
    }

    const products = document.getElementById("products");
    if (products) {
      products.scrollIntoView({ behavior: "smooth" });
      removeExpandedClass();
    }
  };

  const removeExpandedClass = () => {
    let mobileExpandedMenu = document.querySelector(".mobile-expanded-menu");
    if (mobileExpandedMenu) {
      mobileExpandedMenu.classList.remove("mobile-expanded");
    }
  };

  return (
    <div className="links">
      <Link to="/" onClick={removeExpandedClass}>Deals</Link>
      <a href="/#products" onClick={scrollToProducts}>What's New</a>
      <Link to="/delivery" onClick={removeExpandedClass}>Delivery</Link>
    </div>
  );
};

export default Links;
