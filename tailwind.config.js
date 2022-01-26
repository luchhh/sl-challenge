module.exports = {
  safelist: [/^my-/, /^mt-/, /^mb-/, /^mx-/, /^space-x-/, /^space-y-/],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        product: "445px",
        product_mini: "180px",
      },
    },
  },
  plugins: [],
};
