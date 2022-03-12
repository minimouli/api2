/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import Snippet, { SnippetSchema } from './snippet.schema'
import Variable, { VariableSchema } from './variable.schema'

@Schema()
class Hint {

    @Prop({
        type: String,
        required: true,
        enum: [
            'Hint.COMP',
            'Hint.EQUAL',
            'Hint.STREAM_DIFF',
            'Hint.STRING_DIFF',
            'Hint.TIMEOUT',
            'Hint.MATCHER_ERROR'
        ]
    })
    type: string

    @Prop({
        type: String,
        required: true,
        enum: [
            'Status.SUCCESS',
            'Status.FAILURE'
        ]
    })
    status: string

    @Prop({
        type: String,
        required: false,
        enum: [
            'Category.OUTPUT',
            'Category.EXIT_CODE',
            'Category.TIMEOUT'
        ]
    })
    category: string

    @Prop({ required: false })
    message: string

    /* CompHint */
    @Prop({
        type: String,
        required: false,
        enum: [
            '<', '>', '<=', '>='
        ]
    })
    symbol: string

    /* TimeoutHint */
    @Prop({
        type: Number,
        required: false
    })
    timeout: number

    /* CompHint, EqualHint, StringDiffHint */
    @Prop({
        type: VariableSchema,
        required: false
    })
    received: Variable

    @Prop({
        type: VariableSchema,
        required: false
    })
    expected: Variable

    /* Snippet */
    @Prop({
        type: SnippetSchema,
        required: false
    })
    snippet: Snippet

}

const HintSchema = SchemaFactory.createForClass(Hint)

export default Hint
export {
    HintSchema
}
