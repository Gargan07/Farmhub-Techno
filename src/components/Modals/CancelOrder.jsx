import React, { useState } from "react";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import "./Modal.css";

const CancelOrder = () => {
  const { modal, orders, auth } = useGlobalContext();
  const [loading, setLoading] = useState(false);

  const handleClose = () => modal.closeCancelModal();

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);

    const orderToBeCancelled = orders.state.order_to_be_canceled;
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // Remove the order from local storage
    const updatedOrders = storedOrders.filter((order) => order.id !== orderToBeCancelled);

    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    toast.success(`Order #${orderToBeCancelled.slice(0, 6)} has been canceled`);

    // Update the global context state
    orders.setOrders(updatedOrders);

    handleClose();
    setLoading(false);
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-cancel">
          <button className="modal-cancel-button" onClick={handleClose}>
            X
          </button>
        </div>
        <div className="modal-header">
          <h3>Are you sure you want to cancel your order?</h3>
        </div>
        <div className="modal-body">
          <form onSubmit={submitForm}>
            <div className="form-group cancel-modal-group">
              <button type="submit" className="btn-rounded btn-submit btn-submit-small btn-cancel">
                Cancel my order
                {loading && <ClipLoader size={10} aria-label="Loading Spinner" data-testid="loader" />}
              </button>
              <button type="button" className="btn-rounded btn-submit btn-submit-small" onClick={handleClose}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CancelOrder;
