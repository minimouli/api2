/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as mongoose from 'mongoose'
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import Account from '../../account/schemas/account.schema'
import Project from '../../project/schemas/project.schema'
import Suite, { SuiteSchema } from '../../types/schemas/suite.schema'

@Schema()
class Run {

    @Prop()
    uuid: string

    @Prop()
    id: string

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: Account.name
    })
    owner: Account

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: Project.name
    })
    project: Project

    @Prop(raw([SuiteSchema]))
    suites: Suite[]

    @Prop()
    creation_date: string

    @Prop()
    duration: number

}

type RunDocument = Run & Document
const RunSchema = SchemaFactory.createForClass(Run)

export default Run
export {
    RunSchema
}
export type {
    RunDocument
}
