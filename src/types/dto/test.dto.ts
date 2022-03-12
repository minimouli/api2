/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import HintDto from './hint.dto'

class TestDto {

    @ApiProperty()
    name: string

    @ApiProperty({
        enum: [
            'Status.SUCCESS',
            'Status.FAILURE'
        ]
    })
    status: string

    @ApiProperty()
    duration: number

    @ApiPropertyOptional()
    hint: HintDto

}

export default TestDto
