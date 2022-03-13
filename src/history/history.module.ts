/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Module } from '@nestjs/common'
import HistoryController from './history.controller'
import HistoryService from './history.service'
import JwtStrategy from '../auth/strategies/jwt.strategy'
import AccountModule from '../account/account.module'
import ProjectModule from '../project/project.module'
import RunModule from '../run/run.module'

@Module({
    imports: [
        AccountModule,
        ProjectModule,
        RunModule
    ],
    controllers: [HistoryController],
    providers: [
        HistoryService,
        JwtStrategy
    ]
})
class HistoryModule {}

export default HistoryModule
