/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import ProjectController from './project.controller'
import ProjectService from './project.service'
import Project, { ProjectSchema } from './schemas/project.schema'
import RunModule from '../run/run.module'

@Module({
    imports: [
        forwardRef(() => RunModule),
        MongooseModule.forFeature([{
            name: Project.name,
            schema: ProjectSchema
        }])
    ],
    controllers: [ProjectController],
    providers: [ProjectService],
    exports: [ProjectService]
})
class ProjectModule {}

export default ProjectModule
