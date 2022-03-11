/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApiProperty } from '@nestjs/swagger'

class SigninReqDto {

    @ApiProperty()
    readonly identity: string

    @ApiProperty()
    readonly secret: string

}

export default SigninReqDto
