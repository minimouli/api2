/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Module, forwardRef } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import RunController from './run.controller'
import RunService from './run.service'
import Run, { RunSchema } from './schemas/run.schema'
import AccountModule from '../account/account.module'
import JwtStrategy from '../auth/strategies/jwt.strategy'
import ProjectModule from '../project/project.module'

@Module({
    imports: [
        forwardRef(() => ProjectModule),
        AccountModule,
        MongooseModule.forFeature([{
            name: Run.name,
            schema: RunSchema
        }])
    ],
    controllers: [RunController],
    providers: [
        RunService,
        JwtStrategy
    ],
    exports: [RunService]
})
class RunModule {}

export default RunModule
