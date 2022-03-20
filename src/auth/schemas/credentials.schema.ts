/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as mongoose from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import Account from '../../account/schemas/account.schema'

@Schema()
class Credentials {

    @Prop()
    identity: string

    @Prop()
    secret_hash: string

    @Prop()
    refresh_token: string

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: Account.name
    })
    account: Account

}

type CredentialsDocument = Credentials & Document
const CredentialsSchema = SchemaFactory.createForClass(Credentials)

export default Credentials
export {
    CredentialsSchema
}
export type {
    CredentialsDocument
}
