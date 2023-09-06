import { Buffer } from "https://deno.land/std@0.170.0/node/buffer.ts";
import { test } from "npm:@hazae41/phobos";
import { initBundledOnce } from "./mod.ts";

function equals(a: Uint8Array, b: Uint8Array) {
  const ba = Buffer.from(a)
  const bb = Buffer.from(b)

  return ba.equals(bb)
}


test("RSA", async () => {
  await initBundledOnce()


})