/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { v4 as uuidv4 } from 'uuid'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import CreateRunReqDto from './dto/create-run.req.dto'
import Run from './schemas/run.schema'
import Account from '../account/schemas/account.schema'
import ProjectService from '../project/project.service'
import { generateId } from '../helpers/generateId.helper'
import { translateSuiteDtoToSchema } from '../helpers/translateSuite.helper'
import type { RunDocument } from './schemas/run.schema'

@Injectable()
class RunService {

    constructor(
        private readonly projectService: ProjectService,
        @InjectModel(Run.name) private readonly runModel: Model<RunDocument>
    ) {}

    async findById(id: string): Promise<Run | null> {
        return this.runModel.findOne({ id })
            .populate('owner')
            .populate('project')
    }

    async store(account: Account, createRunReqDto: CreateRunReqDto): Promise<Run> {

        const {
            project: projectDto,
            suites,
            duration
        } = createRunReqDto

        const project = await this.projectService.findOrCreate(
            projectDto.name,
            projectDto.module,
            projectDto.organization
        )

        const newRun = new Run()

        newRun.uuid = uuidv4()
        newRun.id = generateId(16)
        newRun.owner = account
        newRun.project = project
        newRun.suites = suites.map(suite => translateSuiteDtoToSchema(suite))
        newRun.creation_date = new Date().toISOString()
        newRun.duration = duration

        return this.runModel.create(newRun)
    }

}

export default RunService
