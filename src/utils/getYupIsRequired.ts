import { reach } from "yup";

/**
 * Determine if a field is required from yup validation schema to ensure a single source of truth
 */

export const getYupIsRequired = (schema: any, fieldName: string) => {
  return reach(schema, fieldName)?.exclusiveTests?.required || false;
};
