import "./Benefits.css";
import { FaRocket, FaSmileWink } from "react-icons/fa";
import { AiFillSafetyCertificate } from "react-icons/ai";

// Benefits data array (placed outside to prevent re-creation)
const benefits = [
  {
    icon: <FaRocket />,
    title: "FAST DELIVERY",
    text: "Deliveries in less than 2 days",
    id: 1,
  },
  {
    icon: <AiFillSafetyCertificate />,
    title: "SAFE PAYMENT",
    text: "All payments are 100% secure",
    id: 2,
  },
  {
    icon: <FaSmileWink />,
    title: "FRIENDLY SERVICES",
    text: "Best customer care services",
    id: 3,
  },
];

const Benefits = () => {
  return (
    <div className="sub-container main-benefit">
      <div className="benefits">
        {benefits.map((benefit) => (
          <div className="benefits-item" key={benefit.id}>
            <div className="benefit-icon">{benefit.icon}</div>
            <div className="benefit-text">
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-body">{benefit.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefits;
