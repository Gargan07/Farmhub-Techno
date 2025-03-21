import React, { useState } from "react";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import "./Modal.css";

const Modal = ({ header, buttonText, isRegister, modal, auth }) => {
  const [loading, setLoading] = useState(false);

  const handleClose = () => modal.closeModal();
  const handleSwitch = () => modal.openModal(!isRegister);

  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Check for empty fields
    if (Object.values(data).some((value) => value.trim() === "")) {
      toast.error("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (isRegister && data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (isRegister) {
      // Check if email is already registered
      if (users.some((user) => user.email === data.email)) {
        toast.error("Email is already registered");
        setLoading(false);
        return;
      }

      // Register new user
      const newUser = {
        username: data.username,
        email: data.email,
        password: data.password,
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      toast.success("Account created successfully!");
      modal.closeModal();
    } else {
      // Login: Check if user exists
      const user = users.find(
        (user) => user.email === data.email && user.password === data.password
      );

      if (!user) {
        toast.error("Invalid email or password");
        setLoading(false);
        return;
      }

      // Save login state
      localStorage.setItem("loggedInUser", JSON.stringify(user));

      toast.success("Login successful!");
      modal.closeModal();
    }

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
          <h3>{header}</h3>
        </div>
        <div className="modal-body">
          <form onSubmit={submitForm}>
            {isRegister && (
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" name="username" />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" name="email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" className="form-control" />
            </div>
            {isRegister && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" className="form-control" />
              </div>
            )}
            <div className="login-or-register">
              {isRegister ? (
                <span>
                  Already have an account?
                  <button className="btn-rounded" type="button" onClick={handleSwitch}>
                    Login
                  </button>
                </span>
              ) : (
                <span>
                  Don't have an account?
                  <button className="btn-rounded" type="button" onClick={handleSwitch}>
                    Create One
                  </button>
                </span>
              )}
            </div>
            <div className="form-group">
              <button type="submit" className="btn-rounded btn-submit">
                {buttonText}{" "}
                {loading && <ClipLoader size={10} aria-label="Loading Spinner" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
