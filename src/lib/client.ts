import { treaty } from "@elysiajs/eden";
import type { App } from "../app/api/[[...slugs]]/route";

export const client =
  // process is defined on server side and build time
  typeof process !== "undefined"
    ? treaty("localhost:3000").api
    : treaty<App>("localhost:3000").api;
