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
      border: `1px solid #9D9D9C`,
      boxShadow: "none",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      pointerEvents: "auto",
      backgroundColor: state?.isDisabled ? "#EBEBE4" : "white",
      cursor: state?.isDisabled ? "not-allowed" : "inherit",
      opacity: state?.isDisabled ? 0.5 : 1,

      "&:hover": {
        boxShadow: `0 0 0 1px #2a73d5`,
        borderColor: "#2a73d5",
      },
    };
  },
};
