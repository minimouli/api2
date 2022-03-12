/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApiProperty } from '@nestjs/swagger'
import TestDto from './test.dto'

class ScoredSuiteDto {

    @ApiProperty()
    name: string

    @ApiProperty()
    suites: ScoredSuiteDto[]

    @ApiProperty()
    tests: TestDto[]

    @ApiProperty()
    score: number

}

export default ScoredSuiteDto
