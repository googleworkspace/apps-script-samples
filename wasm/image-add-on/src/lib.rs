// Copyright 2024 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn compress(data: &[u8], quality: u8, width: u32, height: u32) -> JsValue {
    console_error_panic_hook::set_once();

    let img = match image::load_from_memory_with_format(data, image::ImageFormat::Jpeg) {
        Ok(img) => img,
        Err(_) => return JsValue::from_str("something went wrong"),
    };

    let img = match width == 0 || height == 0 {
        true => img,
        false => img.resize(width, height, image::imageops::FilterType::Lanczos3),
    };

    let mut data = Vec::new();

    let _ = img.write_with_encoder(image::codecs::jpeg::JpegEncoder::new_with_quality(
        &mut data, quality,
    ));

    js_sys::Uint8Array::from(&data[..]).into()
}
