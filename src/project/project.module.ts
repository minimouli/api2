/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import ProjectService from './project.service'
import Project, { ProjectSchema } from './schemas/project.schema'

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Project.name,
            schema: ProjectSchema
        }])
    ],
    providers: [ProjectService],
    exports: [ProjectService]
})
class ProjectModule {}

export default ProjectModule
