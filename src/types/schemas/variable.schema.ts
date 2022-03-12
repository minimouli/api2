/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as mongoose from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
class Variable {

    @Prop({
        type: mongoose.Schema.Types.Mixed,
        required: true
    })
    value: string | string[]

    @Prop({
        type: String,
        required: true,
        enum: [
            'boolean',
            'number',
            'object',
            'string',
            'undefined'
        ]
    })
    type: string

}

const VariableSchema = SchemaFactory.createForClass(Variable)

export default Variable
export {
    VariableSchema
}
