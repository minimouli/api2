/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApiProperty } from '@nestjs/swagger'
import FullRunDto from '../../types/dto/run-full.dto'

class ShowRunResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty()
    data: FullRunDto

}

export default ShowRunResDto
