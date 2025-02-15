// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://mikolajcieszczyk.github.io",
  base: "/",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
});
