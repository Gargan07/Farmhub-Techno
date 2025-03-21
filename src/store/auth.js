import { useReducer } from "react";
import { toast } from "react-toastify";
import { setUserInLocalStorage, getUserFromLocalStorage } from "../helpers/checkExpiration";

const initialState = {
  user: getUserFromLocalStorage() || null,
};

const actions = Object.freeze({
  SET_USER: "SET_USER",
  LOGOUT: "LOGOUT",
});

const reducer = (state, action) => {
  if (action.type === actions.SET_USER) {
    return { ...state, user: action.user };
  }
  if (action.type === actions.LOGOUT) {
    return { ...state, user: null };
  }
  return state;
};

const useAuth = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const register = async (userInfo) => {
    try {
      // Simulating user creation (no API request)
      const user = { ...userInfo, id: Date.now() };

      setUserInLocalStorage(user, 7);
      dispatch({ type: actions.SET_USER, user });
      toast.success("Registration successful");
    } catch (error) {
      toast.error("There was a problem registering, try again");
    }
  };

  const login = async (userInfo) => {
    try {
      const storedUser = getUserFromLocalStorage();
      if (storedUser && storedUser.email === userInfo.email) {
        dispatch({ type: actions.SET_USER, user: storedUser });
        toast.success("Login successful");
      } else {
        toast.error("Invalid email or user not registered");
      }
    } catch (error) {
      toast.error("There was a problem logging in, try again");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: actions.LOGOUT });
    toast.success("Logged out successfully");
  };

  return { state, register, login, logout };
};

export default useAuth;
