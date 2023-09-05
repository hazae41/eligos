export * from "../../../wasm/pkg/eligos.js";

import { __wbg_init, InitOutput } from "../../../wasm/pkg/eligos.js";
import { data } from "../../../wasm/pkg/eligos.wasm.js";

let output: InitOutput | undefined = undefined

export async function initBundledOnce() {
  return output ??= await __wbg_init(data)
}
