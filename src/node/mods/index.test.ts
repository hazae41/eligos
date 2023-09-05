import { test } from "@hazae41/phobos";
import { SigningKey, initBundledOnce } from "./index.js";

function equals(a: Uint8Array, b: Uint8Array) {
  const ba = Buffer.from(a)
  const bb = Buffer.from(b)

  return ba.equals(bb)
}

test("sign", async () => {
  await initBundledOnce()

  // const hello = new TextEncoder().encode("hello world")
  const bytes = crypto.getRandomValues(new Uint8Array(32))

  const keypair = new SigningKey()
  // const identity = keypair.to_public_key()

  const signature = keypair.sign_prehashed(bytes)
  const r = signature.r().copy()
  const s = signature.s().copy()
  const v = signature.v()

  console.log(r, s, v)
})