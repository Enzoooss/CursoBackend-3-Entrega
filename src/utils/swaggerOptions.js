module.exports = {
    definition: {
      openapi: "3.0.1",
      info: {
        title: "Documentación Enzo E-commerce",
        description: "",
      },
    },
    apis: [`${__dirname}/../../docs/**/*.yaml`],
  };