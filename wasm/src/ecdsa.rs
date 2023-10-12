extern crate alloc;

use wasm_bindgen::prelude::*;

use crate::Memory;

#[wasm_bindgen]
pub struct SigningKey {
    pub(crate) inner: k256::ecdsa::SigningKey,
}

#[wasm_bindgen]
impl SigningKey {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self::random()
    }

    #[wasm_bindgen]
    pub fn random() -> Self {
        let inner = k256::ecdsa::SigningKey::random(&mut rand_core::OsRng {});

        Self { inner }
    }

    #[wasm_bindgen]
    pub fn from_bytes(input: &Memory) -> Result<SigningKey, JsError> {
        use k256::elliptic_curve::generic_array::GenericArray;

        let array = GenericArray::from_slice(&input.inner);
        let result = k256::ecdsa::SigningKey::from_bytes(array);
        let inner = result.map_err(|_| JsError::new("SigningKey::from_bytes"))?;

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn to_bytes(&self) -> Memory {
        Memory::new(self.inner.to_bytes().to_vec())
    }

    #[wasm_bindgen]
    pub fn verifying_key(&self) -> VerifyingKey {
        let inner = self.inner.verifying_key().clone();

        VerifyingKey { inner }
    }

    #[wasm_bindgen]
    pub fn sign_prehash_recoverable(
        &self,
        hashed: &Memory,
    ) -> Result<SignatureAndRecovery, JsError> {
        let rsign = self.inner.sign_prehash_recoverable(&hashed.inner);
        let tuple = rsign.map_err(|_| JsError::new("SigningKey::sign_prehash_recoverable"))?;
        let (signature0, recovery) = tuple;

        let signature = signature0.normalize_s().unwrap_or(signature0);

        Ok(SignatureAndRecovery {
            signature,
            recovery,
        })
    }
}

#[wasm_bindgen]
pub struct SignatureAndRecovery {
    pub(crate) signature: k256::ecdsa::Signature,
    pub(crate) recovery: k256::ecdsa::RecoveryId,
}

#[wasm_bindgen]
impl SignatureAndRecovery {
    #[wasm_bindgen]
    pub fn to_bytes(&self) -> Memory {
        let mut bytes = self.signature.to_bytes().to_vec();
        bytes.push(self.recovery.to_byte());
        Memory::new(bytes)
    }
}

#[wasm_bindgen]
pub struct VerifyingKey {
    pub(crate) inner: k256::ecdsa::VerifyingKey,
}

#[wasm_bindgen]
impl VerifyingKey {
    #[wasm_bindgen]
    pub fn from_sec1_bytes(input: &Memory) -> Result<VerifyingKey, JsError> {
        let result = k256::ecdsa::VerifyingKey::from_sec1_bytes(&input.inner);
        let inner = result.map_err(|_| JsError::new("VerifyingKey::from_sec1_bytes"))?;

        Ok(Self { inner })
    }

    #[wasm_bindgen]
    pub fn recover_from_prehash(
        hashed: &Memory,
        signature: &SignatureAndRecovery,
    ) -> Result<VerifyingKey, JsError> {
        let result = k256::ecdsa::VerifyingKey::recover_from_prehash(
            &hashed.inner,
            &signature.signature,
            signature.recovery,
        );
        let inner = result.map_err(|_| JsError::new("VerifyingKey::recover_from_prehash"))?;

        Ok(VerifyingKey { inner })
    }

    #[wasm_bindgen]
    pub fn to_sec1_compressed_bytes(&self) -> Memory {
        Memory::new(self.inner.to_encoded_point(true).to_bytes().into())
    }

    #[wasm_bindgen]
    pub fn to_sec1_uncompressed_bytes(&self) -> Memory {
        Memory::new(self.inner.to_encoded_point(false).to_bytes().into())
    }
}
