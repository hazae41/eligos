import { assert, test } from "@hazae41/phobos";
import { secp256k1 } from "@noble/curves/secp256k1";
import { SigningKey, VerifyingKey, initBundledOnce } from "./index.js";

function equals(a: Uint8Array, b: Uint8Array) {
  const ba = Buffer.from(a)
  const bb = Buffer.from(b)

  return ba.equals(bb)
}

test("sign", async () => {
  await initBundledOnce()

  const hashed = crypto.getRandomValues(new Uint8Array(32))

  const keypair = new SigningKey()
  const identity = keypair.verifying_key()

  const signaturex = keypair.sign_prehash_recoverable(hashed)
  const signature = signaturex.to_bytes().bytes

  const r = signature.subarray(0, 32)
  const s = signature.subarray(32, 64)
  const v = signature[64]

  console.log(r, s, v)

  const identity2 = VerifyingKey.recover_from_prehash(hashed, signaturex)

  assert(equals(identity.to_sec1_bytes().bytes, identity2.to_sec1_bytes().bytes))

  const signature2 = secp256k1.Signature.fromCompact(signature.subarray(0, 64))
  const signature3 = signature2.addRecoveryBit(v)
  const identity3 = signature3.recoverPublicKey(hashed).toRawBytes()

  assert(equals(identity.to_sec1_bytes().bytes, identity3))
})