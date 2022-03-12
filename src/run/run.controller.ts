/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
    Controller,
    Body,
    Get,
    NotFoundException,
    Param,
    Post,
    Request,
    UseGuards
} from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiNotFoundResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger'
import RunService from './run.service'
import CreateRunReqDto from './dto/create-run.req.dto'
import CreateRunResDto from './dto/create-run.res.dto'
import ShowRunResDto from './dto/show-run.res.dto'
import JwtGuard from '../auth/guards/jwt-auth.guard'
import { translateSuiteSchemaToDto } from '../helpers/translateSuite.helper'

@Controller('/run')
@ApiTags('run')
@ApiBearerAuth()
class RunController {

    constructor(
        private readonly runService: RunService
    ) {}

    @Post('/')
    @UseGuards(JwtGuard)
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    async create(@Request() req, @Body() createRunReqDto: CreateRunReqDto): Promise<CreateRunResDto> {

        const run = await this.runService.store(
            req.user.account, createRunReqDto
        )

        return {
            status: 'success',
            data: {
                uuid: run.uuid,
                id: run.id,
                uri: `minimouli:run:${run.id}`
            }
        }
    }

    @Get('/:id')
    @ApiNotFoundResponse({ description: 'The specified id does not correspond to a run.' })
    async show(@Param('id') id: string): Promise<ShowRunResDto> {

        const run = await this.runService.findById(id)

        if (!run)
            throw new NotFoundException('The specified id does not correspond to a run.')

        return {
            status: 'success',
            data: {
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
                suites: run.suites.map(suite => translateSuiteSchemaToDto(suite)),
                creation_date: run.creation_date,
                duration: run.duration
            }
        }
    }

}

export default RunController
