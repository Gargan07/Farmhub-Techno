const setUserInLocalStorage = (user, days) => {
  const now = new Date();
  const expirationDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  
  const userData = {
    ...user,
    expirationDate: expirationDate.toISOString(),
  };
  
  localStorage.setItem("user", JSON.stringify(userData));
};

const getUserFromLocalStorage = () => {
  const userItem = localStorage.getItem("user");
  if (!userItem) {
    return null;
  }

  const user = JSON.parse(userItem);
  const expirationDate = new Date(user.expirationDate);
  
  if (new Date().getTime() > expirationDate.getTime()) {
    localStorage.removeItem("user");
    return null;
  }
  
  return user;
};

export { setUserInLocalStorage, getUserFromLocalStorage };
