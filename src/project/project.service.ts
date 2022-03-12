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
import Project from './schemas/project.schema'
import { generateId } from '../helpers/generateId.helper'
import type { ProjectDocument } from './schemas/project.schema'

@Injectable()
class ProjectService {

    constructor(
        @InjectModel(Project.name) private readonly projectModel: Model<ProjectDocument>
    ) {}

    async findByUuid(uuid: string): Promise<Project> {
        return this.projectModel.findOne({ uuid })
    }

    async findByPayload(name: string, module: string, organization: string): Promise<Project> {
        return this.projectModel.findOne({
            name,
            module,
            organization
        })
    }

    async create(name: string, module: string, organization: string): Promise<Project> {

        const newProject = new Project()

        newProject.uuid = uuidv4()
        newProject.id = generateId(16)
        newProject.name = name
        newProject.module = module
        newProject.organization = organization

        return this.projectModel.create(newProject)
    }

    async findOrCreate(name: string, module: string, organization: string): Promise<Project> {

        const foundProject = await this.findByPayload(name, module, organization)

        if (foundProject)
            return foundProject

        return this.create(name, module, organization)
    }

}

export default ProjectService
