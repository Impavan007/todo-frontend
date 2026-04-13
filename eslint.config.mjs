import coreWebVitalsConfig from "eslint-config-next/core-web-vitals.js";
import typescriptConfig from "eslint-config-next/typescript.js";

const eslintConfig = [
  coreWebVitalsConfig,
  typescriptConfig,
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
