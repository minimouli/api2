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
    Query,
    Request,
    UseGuards
} from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiNotFoundResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger'
import HistoryService from './history.service'
import ListRunResDto from './dto/list-run.res.dto'
import JwtGuard from '../auth/guards/jwt-auth.guard'
import ProjectService from '../project/project.service'
import { calculateScoreFromSuites } from '../helpers/calculateScore.helper'
import { range } from '../helpers/number.helper'

@Controller('/history')
@ApiTags('history')
@ApiBearerAuth()
class HistoryController {

    constructor(
        private readonly historyService: HistoryService,
        private readonly projectService: ProjectService
    ) {}

    @Get('/me/:id')
    @UseGuards(JwtGuard)
    @ApiNotFoundResponse({ description: 'The specified id does not correspond to a project.' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async list(@Request() req, @Query() query, @Param('id') id: string): Promise<ListRunResDto> {

        const offset = range(parseInt(query.offset, 10), 0, Infinity, 0)
        const limit = range(parseInt(query.limit, 10), 0, 50, 20)

        const project = await this.projectService.findById(id)

        if (!project)
            throw new NotFoundException('The specified id does not correspond to a project.')

        const options = {
            offset,
            limit
        }

        const runs = await this.historyService.list(req.user.account, project, options)
        const total = await this.historyService.count(req.user.account, project)

        return {
            status: 'success',
            data: {
                items: runs.map(run => ({
                    uuid: run.uuid,
                    id: run.id,
                    uri: `minimouli:run:${run.id}`,
                    owner: {
                        uuid: run.owner.uuid
                    },
                    project: {
                        uuid: run.project.uuid,
                        id: run.project.id,
                        uri: `minimouli:project:${run.project.id}`,
                        name: run.project.name,
                        module: run.project.module,
                        organization: run.project.organization
                    },
                    score: calculateScoreFromSuites(run.suites),
                    creation_date: run.creation_date,
                    duration: run.duration
                })),
                offset,
                limit,
                total
            }
        }
    }

}

export default HistoryController
