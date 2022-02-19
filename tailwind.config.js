module.exports = {
  safelist: [
    { pattern: /^my-/ },
    { pattern: /^mt-/ },
    { pattern: /^mb-/ },
    { pattern: /^mx-/ },
    { pattern: /^space-x-/ },
    { pattern: /^space-y-/ },
  ],
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
