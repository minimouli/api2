/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Injectable } from '@nestjs/common'
import Account from '../account/schemas/account.schema'
import Project from '../project/schemas/project.schema'
import RunService from '../run/run.service'
import Run from '../run/schemas/run.schema'
import type { PaginationOptions } from '../types/options'

@Injectable()
class HistoryService {

    constructor(
        private readonly runService: RunService
    ) {}

    async list(account: Account, project: Project, options: PaginationOptions): Promise<Run[] | null> {
        return this.runService.listForUserHistory(account, project, options)
    }

    async count(account: Account, project: Project): Promise<number> {
        return this.runService.countForUserHistory(account, project)
    }

}

export default HistoryService
