/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
    Controller,
    Body,
    Post,
    Request,
    UseGuards
} from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger'
import RunService from './run.service'
import CreateRunReqDto from './dto/create-run.req.dto'
import CreateRunResDto from './dto/create-run.res.dto'
import JwtGuard from '../auth/guards/jwt-auth.guard'

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

}

export default RunController
