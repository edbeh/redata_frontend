export const getAppVersion = () => {
  return `${process.env.REACT_APP_TIMESTAMP}-${process.env.REACT_APP_VERSION}`;
};
