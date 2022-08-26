// *JWT Token
export const getJwtTokenLocalStorage = () => {
  const result = localStorage.getItem("jwt_token");
  return result;
};

export const setJwtTokenLocalStorage = (token: string) => {
  localStorage.setItem("jwt_token", token);
};

export const removeJwtTokenLocalStorage = () => {
  localStorage.removeItem("jwt_token");
};
