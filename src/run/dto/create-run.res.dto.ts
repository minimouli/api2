/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApiProperty } from '@nestjs/swagger'

class CreateRunResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty()
    data: {
        uuid: string,
        id: string,
        uri: string
    }

}

export default CreateRunResDto
