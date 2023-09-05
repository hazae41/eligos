extern crate alloc;

use alloc::{boxed::Box, vec::Vec};

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct SigningKey {
    pub(crate) inner: Box<k256::ecdsa::SigningKey>,
}

#[wasm_bindgen]
impl SigningKey {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self::random()
    }

    #[wasm_bindgen]
    pub fn random() -> Self {
        let key = k256::ecdsa::SigningKey::random(&mut rand_core::OsRng {});
        let inner = Box::new(key);

        Self { inner }
    }

    #[wasm_bindgen]
    pub fn from_bytes(input: &[u8]) -> Result<SigningKey, JsError> {
        let rkey = k256::ecdsa::SigningKey::from_bytes(input.try_into()?);
        let key = rkey.map_err(|_| JsError::new("SigningKey::from_bytes"))?;
        let inner = Box::new(key);

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn to_bytes(&self) -> Vec<u8> {
        self.inner.to_bytes().to_vec()
    }

    #[wasm_bindgen]
    pub fn sign_prehashed(&self, bytes: &[u8]) -> Result<Signature, JsError> {
        let rsign = self.inner.sign_recoverable(bytes);
        let tuple = rsign.map_err(|_| JsError::new("SigningKey::sign_prehashed"))?;
        let (signature, recovery) = tuple;
        let (gr, gs) = signature.normalize_s().unwrap_or(signature).split_bytes();

        let r = gr.to_vec();
        let s = gs.to_vec();
        let v = recovery.to_byte();

        Ok(Signature { r, s, v })
    }
}

#[wasm_bindgen]
pub struct Signature {
    pub(crate) r: Vec<u8>,
    pub(crate) s: Vec<u8>,
    pub(crate) v: u8,
}

#[wasm_bindgen]
impl Signature {
    #[wasm_bindgen]
    pub fn r(&self) -> Vec<u8> {
        self.r.clone()
    }

    #[wasm_bindgen]
    pub fn s(&self) -> Vec<u8> {
        self.s.clone()
    }

    #[wasm_bindgen]
    pub fn v(&self) -> u8 {
        self.v
    }
}
