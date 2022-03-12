/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApiProperty } from '@nestjs/swagger'
import RunDto from '../../types/dto/run.dto'

class ShowRunResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty()
    data: RunDto

}

export default ShowRunResDto
