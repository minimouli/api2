/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import Hint, { HintSchema } from './hint.schema'

@Schema()
class Test {

    @Prop({ required: true })
    name: string

    @Prop({
        type: String,
        required: true,
        enum: [
            'Status.SUCCESS',
            'Status.FAILURE'
        ]
    })
    status: string

    @Prop({ required: true })
    duration: number

    @Prop({
        type: HintSchema,
        required: false
    })
    hint: Hint

}

const TestSchema = SchemaFactory.createForClass(Test)

export default Test
export {
    TestSchema
}
