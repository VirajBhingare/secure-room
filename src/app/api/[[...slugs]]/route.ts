import { Elysia } from "elysia";

// Create Room
const rooms = new Elysia({ prefix: "/room" }).post("/create", () => {
  console.log("CREATE A NEW ROOM");
});

const apiRoutes = new Elysia().use(rooms);
const app = new Elysia({ prefix: "/api" }).use(apiRoutes);

export const GET = app.fetch;
export const POST = app.fetch;

export type App = typeof apiRoutes;
