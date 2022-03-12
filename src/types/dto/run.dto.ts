/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApiProperty } from '@nestjs/swagger'
import AccountDto from './account.dto'
import ProjectFullDto from './project-full.dto'
import SuiteDto from './suite.dto'

class RunDto {

    @ApiProperty()
    uuid: string

    @ApiProperty()
    id: string

    @ApiProperty()
    uri: string

    @ApiProperty()
    owner: AccountDto

    @ApiProperty()
    project: ProjectFullDto

    @ApiProperty()
    suites: SuiteDto[]

    @ApiProperty()
    creation_date: string

    @ApiProperty()
    duration: number

}

export default RunDto
