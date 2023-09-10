export const signOut = () => {
  localStorage.clear();
  sessionStorage.clear();
  return (window.location.href = `${window.location.origin}/login`);
};
