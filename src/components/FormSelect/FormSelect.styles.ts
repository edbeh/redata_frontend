export const selectStyles = {
  container: (styles: any) => ({
    ...styles,
    width: "100%",
  }),
  control: (styles: any, state: any) => {
    return {
      ...styles,
      borderRadius: 6,
      height: 42,
      border: "none",
      boxShadow: "none",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      pointerEvents: "auto",
      backgroundColor: state?.isDisabled ? "#EBEBE4" : "white",
      cursor: state?.isDisabled ? "not-allowed" : "inherit",
      opacity: state?.isDisabled ? 0.5 : 1,
    };
  },
};
