// astro.config.mjs
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://mikolajcieszczyk.github.io",
  base: "/mc-blog/",
  build: {
    format: "directory",
  },
});
