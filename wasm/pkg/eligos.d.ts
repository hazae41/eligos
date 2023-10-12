/* tslint:disable */
/* eslint-disable */
/**
*/
export class Memory {
  [Symbol.dispose](): void
  free(): void;
/**
* @param {Uint8Array} inner
*/
  constructor(inner: Uint8Array);
/**
* @returns {number}
*/
  ptr(): number;
/**
* @returns {number}
*/
  len(): number;

  /**
   * Free on next tick
   **/
  freeNextTick(): Memory

  /**
   * Get the bytes in memory
   **/
  get bytes(): Uint8Array

  /**
   * Copy the bytes and free them
   **/
  copyAndDispose(): Uint8Array
}
/**
*/
export class SignatureAndRecovery {
  [Symbol.dispose](): void
  free(): void;
/**
* @returns {Memory}
*/
  to_bytes(): Memory;
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
* @param {Memory} input
* @returns {SigningKey}
*/
  static from_bytes(input: Memory): SigningKey;
/**
* @returns {Memory}
*/
  to_bytes(): Memory;
/**
* @returns {VerifyingKey}
*/
  verifying_key(): VerifyingKey;
/**
* @param {Memory} hashed
* @returns {SignatureAndRecovery}
*/
  sign_prehash_recoverable(hashed: Memory): SignatureAndRecovery;
}
/**
*/
export class VerifyingKey {
  [Symbol.dispose](): void
  free(): void;
/**
* @param {Memory} input
* @returns {VerifyingKey}
*/
  static from_sec1_bytes(input: Memory): VerifyingKey;
/**
* @param {Memory} hashed
* @param {SignatureAndRecovery} signature
* @returns {VerifyingKey}
*/
  static recover_from_prehash(hashed: Memory, signature: SignatureAndRecovery): VerifyingKey;
/**
* @returns {Memory}
*/
  to_sec1_compressed_bytes(): Memory;
/**
* @returns {Memory}
*/
  to_sec1_uncompressed_bytes(): Memory;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_signingkey_free: (a: number) => void;
  readonly signingkey_new: () => number;
  readonly signingkey_from_bytes: (a: number, b: number) => void;
  readonly signingkey_to_bytes: (a: number) => number;
  readonly signingkey_verifying_key: (a: number) => number;
  readonly signingkey_sign_prehash_recoverable: (a: number, b: number, c: number) => void;
  readonly __wbg_signatureandrecovery_free: (a: number) => void;
  readonly signatureandrecovery_to_bytes: (a: number) => number;
  readonly verifyingkey_from_sec1_bytes: (a: number, b: number) => void;
  readonly verifyingkey_recover_from_prehash: (a: number, b: number, c: number) => void;
  readonly verifyingkey_to_sec1_compressed_bytes: (a: number) => number;
  readonly verifyingkey_to_sec1_uncompressed_bytes: (a: number) => number;
  readonly __wbg_memory_free: (a: number) => void;
  readonly memory_new: (a: number, b: number) => number;
  readonly memory_ptr: (a: number) => number;
  readonly memory_len: (a: number) => number;
  readonly signingkey_random: () => number;
  readonly __wbg_verifyingkey_free: (a: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
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
