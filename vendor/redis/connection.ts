import { connect, Redis } from "redis";

let redis: Redis;
let redisIsConnected = false;

export async function initializeRedis() {
  if (redisIsConnected) {
    return;
  }

  // validate env vars
  if (!Deno.env.get("REDIS_HOST")) {
    throw new Error("REDIS_HOST is not defined");
  }

  redis = await connect({
    hostname: Deno.env.get("REDIS_HOST")!,
    port: Deno.env.get("REDIS_PORT") ? parseInt(Deno.env.get("REDIS_PORT")!) : 6379,
    db: Deno.env.get("REDIS_DB") ? parseInt(Deno.env.get("REDIS_DB")!) : 0,
    password: Deno.env.get("REDIS_PASSWORD"),
  });
  redisIsConnected = true;
  return redis;
}


export { redis };