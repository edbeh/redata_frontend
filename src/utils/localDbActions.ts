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

// *Admin Dept
export const getAdminDeptLocalStorage = () => {
  const result = localStorage.getItem("admin_dept");
  return result;
};

export const setAdminDeptLocalStorage = (adminDept: string) => {
  localStorage.setItem("admin_dept", adminDept);
};

export const removeAdminDeptLocalStorage = () => {
  localStorage.removeItem("admin_dept");
};

// *Assume as
export const getAssumeAsSessionStorage = () => {
  return sessionStorage.getItem("assume_as");
};

export const setAssumeAsSessionStorage = (name: string) => {
  sessionStorage.setItem("assume_as", name || "");
};

export const removeAssumeAsSessionStorage = () => {
  sessionStorage.removeItem("assume_as");
};

// *Acknowledged At flag
export const getRequireAcknowledgementSessionStorage = () => {
  const result = sessionStorage.getItem("require_acknowledgement");
  return result;
};

export const setRequireAcknowledgementSessionStorage = () => {
  sessionStorage.setItem("require_acknowledgement", "true");
};

export const removeRequireAcknowledgementSessionStorage = () => {
  sessionStorage.removeItem("require_acknowledgement");
};
