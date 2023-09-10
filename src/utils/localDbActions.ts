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

// *Admin Name
export const getAdminNameLocalStorage = () => {
  const result = localStorage.getItem("admin_name");
  return result;
};

export const setAdminNameLocalStorage = (adminName: string) => {
  localStorage.setItem("admin_name", adminName);
};

export const removeAdminNameLocalStorage = () => {
  localStorage.removeItem("admin_name");
};
