import { redis } from "@/lib/redis";
import { Elysia } from "elysia";
import { nanoid } from "nanoid";

const ROOM_TTL_SECONDS = 10 * 60; // 10 Minutes (TTL : Time to Live)

const rooms = new Elysia({ prefix: "/room" }).post("/create", async () => {
  const roomId = nanoid();
  await redis.hset(`meta: ${roomId}`, {
    connected: [],
    createdAt: Date.now(),
  });

  await redis.expire(`meta: ${roomId}`, ROOM_TTL_SECONDS);

  return { roomId };
});

const apiRoutes = new Elysia().use(rooms);
const app = new Elysia({ prefix: "/api" }).use(apiRoutes);

export const GET = app.fetch;
export const POST = app.fetch;

export type App = typeof apiRoutes;
