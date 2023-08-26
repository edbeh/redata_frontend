// *JWT Token
export const getJwtTokenLocalStorage = () => {
  const result = localStorage.getItem("token");
  return result;
};

export const setJwtTokenLocalStorage = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeJwtTokenLocalStorage = () => {
  localStorage.removeItem("token");
};
