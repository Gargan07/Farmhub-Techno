import "./ShopFooter.css";

const ShopFooter = () => {
  const newYear = new Date().getFullYear();

  return (
    <div className="sub-container">
      <div className="useful-links">
        <h2 className="logo-text">LOGO</h2>
        <ul className="useful-details">
          <li>+233 xxx xxx xxx</li>
          <li>Location: xx, xxx</li>
          <li>Socials</li>
        </ul>
      </div>

      <div className="bottom-section">
        <div className="bottom-section-left">
          <ul>
            <li>
              <a href="/">Deals</a>
            </li>
            <li>
              <a href="#products">What's New</a>
            </li>
            <li>
              <a href="#">Delivery</a>
            </li>
          </ul>
        </div>
        <div className="bottom-section-right">Copyright &copy; {newYear}</div>
      </div>
    </div>
  );
};

export default ShopFooter;
