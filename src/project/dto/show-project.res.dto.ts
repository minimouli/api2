/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApiProperty } from '@nestjs/swagger'
import FullProjectDto from '../../types/dto/project-full.dto'

class ShowProjectResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty()
    data: FullProjectDto

}

export default ShowProjectResDto
