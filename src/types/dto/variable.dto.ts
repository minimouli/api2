/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApiProperty } from '@nestjs/swagger'

class VariableDto {

    @ApiProperty()
    value: string | string[]

    @ApiProperty({
        enum: [
            'boolean',
            'number',
            'object',
            'string',
            'undefined'
        ]
    })
    type: string

}

export default VariableDto
