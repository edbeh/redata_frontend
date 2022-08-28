module.exports = {
  swagger: {
    output: {
      mode: "tags-split",
      target: "src/api/swagger.ts",
      schemas: "src/api/model",
      client: "react-query",
      mock: false,
    },
    input: {
      target: "https://redata-staging.herokuapp.com/api-docs/v1/swagger.yaml",
    },
  },
};
