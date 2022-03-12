/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'
import ProjectPayloadDto from '../../types/dto/project-payload.dto'
import SuiteDto from '../../types/dto/suite.dto'

class CreateRunReqDto {

    @ApiProperty()
    readonly project: ProjectPayloadDto

    @ApiProperty()
    readonly suites: SuiteDto[]

    @ApiProperty()
    @IsNumber()
    readonly duration: number

}

export default CreateRunReqDto
