/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApiProperty } from '@nestjs/swagger'
import {
    IsString,
    Matches
} from 'class-validator'

class SignupReqDto {

    @ApiProperty()
    @IsString()
    @Matches(/^[a-zA-z0-9-_]{64}$/)
    readonly identity: string

    @ApiProperty()
    @IsString()
    @Matches(/^[a-zA-z0-9-_]{64}$/)
    readonly secret: string

}

export default SignupReqDto
