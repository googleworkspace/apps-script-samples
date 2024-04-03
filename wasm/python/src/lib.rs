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

use rustpython_vm::{
    builtins::PyBaseException, compiler::Mode, convert::ToPyObject, py_serde, Interpreter,
    PyObjectRef, PyRef, VirtualMachine,
};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn python(source: &str, data: &JsValue) -> JsValue {
    console_error_panic_hook::set_once();

    Interpreter::with_init(Default::default(), |_vm| {})
    .enter(|vm| {
        let data = match deserialize(data.clone(), vm) {
            Ok(data) => data,
            Err(err) => return PyError::new(err.to_string().into()).into(),
        };

        let scope = vm.new_scope_with_builtins();
        match scope.globals.set_item("args", data, vm) {
            Ok(()) => {}
            Err(err) => return serialize_exception(err, vm).into(),
        }

        let py_obj = match vm
            .compile(source, Mode::BlockExpr, "<embedded>".to_owned())
            .map_err(|err| vm.new_syntax_error(&err, Some(source)))
            .and_then(|code_obj| vm.run_code_obj(code_obj, scope).clone())
        {
            Ok(py_obj) => py_obj,
            Err(err) => return serialize_exception(err, vm).into(),
        };

        serialize(&py_obj, vm)
    })
}

#[wasm_bindgen(inline_js = r"
export class PyError extends Error {
    constructor(message) {
        super(message);
    }
}
")]
extern "C" {
    pub type PyError;
    #[wasm_bindgen(constructor)]
    fn new(message: JsValue) -> PyError;
}

fn serialize_exception(err: PyRef<PyBaseException>, vm: &VirtualMachine) -> PyError {
    PyError::new(serialize(&err.args().to_pyobject(vm), vm))
}

fn serialize(py_obj: &PyObjectRef, vm: &VirtualMachine) -> JsValue {
    py_serde::serialize(vm, py_obj, &serde_wasm_bindgen::Serializer::new())
        .unwrap_or(format!("Failed to serialize: {:?}", py_obj).into())
}

fn deserialize(
    value: JsValue,
    vm: &VirtualMachine,
) -> Result<PyObjectRef, serde_wasm_bindgen::Error> {
    let deserializer: serde_wasm_bindgen::Deserializer = value.into();

    py_serde::deserialize(vm, deserializer)
}
