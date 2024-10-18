// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt().append({
  rules: {
    "vue/html-self-closing": "off",
  },
});
