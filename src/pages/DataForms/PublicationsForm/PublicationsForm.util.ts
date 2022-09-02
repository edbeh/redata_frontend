import { Hash } from "./PublicationsForm.model";

export const findMaxOccurrence = (hash: Hash) => {
  const max = Object.keys(hash).reduce(
    (a, v) => Math.max(a, hash[v]),
    -Infinity
  );
  return Object.keys(hash).filter((v) => hash[v] === max);
};
