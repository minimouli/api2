/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
    Controller,
    Get,
    NotFoundException,
    Param,
} from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiNotFoundResponse,
    ApiTags,
} from '@nestjs/swagger'
import ProjectService from './project.service'
import ShowProjectResDto from './dto/show-project.res.dto'
import RunService from '../run/run.service'

@Controller('/project')
@ApiTags('project')
class ProjectController {

    constructor(
        private readonly projectService: ProjectService,
        private readonly runService: RunService
    ) {}

    @Get('/:id')
    @ApiNotFoundResponse({ description: 'The specified id does not correspond to a project.' })
    async show(@Param('id') id: string): Promise<ShowProjectResDto> {

        const project = await this.projectService.findById(id)

        if (!project)
            throw new NotFoundException('The specified id does not correspond to a project.')

        const record = await this.runService.countByProject(project)

        return {
            status: 'success',
            data: {
                uuid: project.uuid,
                id: project.id,
                uri: `minimouli:project:${project.id}`,
                name: project.name,
                module: project.module,
                organization: project.organization,
                record
            }
        }
    }

}

export default ProjectController
