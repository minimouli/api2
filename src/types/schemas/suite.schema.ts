/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as mongoose from 'mongoose'
import Test, { TestSchema } from './test.schema'

class Suite {
    name: string
    tests: Test[]
    suites: Suite[]
}

const SuiteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tests: {
        type: [TestSchema],
        required: true
    }
}, {_id: false})

SuiteSchema.add({
    suites: {
        type: [SuiteSchema],
        required: true
    }
})

export default Suite
export {
    SuiteSchema
}
