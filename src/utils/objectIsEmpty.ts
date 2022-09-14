export const objectIsEmpty = (obj: object) => {
  for (const prop in obj) {
    return false;
  }

  return true;
};
