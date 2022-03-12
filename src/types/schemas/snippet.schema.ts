/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
class SnippetArgument {

    @Prop({
        type: [String],
        required: true
    })
    received: string[]

    @Prop({
        type: [String],
        required: true
    })
    expected: string[]

}

const SnippetArgumentSchema = SchemaFactory.createForClass(SnippetArgument)

@Schema()
class Snippet {

    @Prop({
        type: SnippetArgumentSchema,
        required: true
    })
    arguments: SnippetArgument

    @Prop({ required: true })
    method: string

}

const SnippetSchema = SchemaFactory.createForClass(Snippet)

export default Snippet
export {
    SnippetSchema
}
