
import type { Result } from "@hazae41/result"
import type { Cursor, CursorWriteError } from "@hazae41/cursor"

/* tslint:disable */
/* eslint-disable */
/**
*/
export class Signature {

  [Symbol.dispose](): void

  free(): void;
/**
* @returns {Slice}
*/
  r(): Slice;
/**
* @returns {Slice}
*/
  s(): Slice;
/**
* @returns {number}
*/
  v(): number;
}
/**
*/
export class SigningKey {

  [Symbol.dispose](): void

  free(): void;
/**
*/
  constructor();
/**
* @returns {SigningKey}
*/
  static random(): SigningKey;
/**
* @param {Uint8Array} input
* @returns {SigningKey}
*/
  static from_bytes(input: Uint8Array): SigningKey;
/**
* @returns {Slice}
*/
  to_bytes(): Slice;
/**
* @param {Uint8Array} bytes
* @returns {Signature}
*/
  sign_prehashed(bytes: Uint8Array): Signature;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_signingkey_free: (a: number) => void;
  readonly signingkey_new: () => number;
  readonly signingkey_from_bytes: (a: number, b: number, c: number) => void;
  readonly signingkey_to_bytes: (a: number, b: number) => void;
  readonly signingkey_sign_prehashed: (a: number, b: number, c: number, d: number) => void;
  readonly __wbg_signature_free: (a: number) => void;
  readonly signature_r: (a: number, b: number) => void;
  readonly signature_s: (a: number, b: number) => void;
  readonly signature_v: (a: number) => number;
  readonly signingkey_random: () => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;


export class Slice {

  readonly ptr: number

  readonly len: number

  constructor(ptr: number, len: number);

  /**
   * Free the bytes
   **/
  [Symbol.dispose](): void

  /**
   * Get the bytes in memory
   **/
  get bytes(): Uint8Array

  /**
   * Free the bytes
   **/
  free(): void

  /**
   * Copy the bytes and free them
   **/
  copy(): Uint8Array

  trySize(): Result<number, never>

  tryWrite(cursor: Cursor): Result<void, CursorWriteError>

}