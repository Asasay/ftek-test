const path = require("path");

export default {
  base: "/ftek-test/",
  root: path.resolve(__dirname, "src"),
  build: {
    outDir: "../dist",
  },
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
      "~bootstrap-icons": path.resolve(__dirname, "node_modules/bootstrap-icons"),
    },
  },
  server: {
    port: 8080,
    hot: true,
  },
};
