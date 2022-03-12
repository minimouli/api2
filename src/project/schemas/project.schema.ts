/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
class Project {

    @Prop()
    uuid: string

    @Prop()
    id: string

    @Prop()
    name: string

    @Prop()
    module: string

    @Prop()
    organization: string

}

type ProjectDocument = Project & Document
const ProjectSchema = SchemaFactory.createForClass(Project)

export default Project
export {
    ProjectSchema
}
export type {
    ProjectDocument
}
