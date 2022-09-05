export const signOut = () => {
  localStorage.clear();
  return (window.location.href = `${window.location.origin}/login`);
};
