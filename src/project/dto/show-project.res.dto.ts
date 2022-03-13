/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApiProperty } from '@nestjs/swagger'
import ProjectExtraDto from '../../types/dto/project-extra.dto'

class ShowProjectResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty()
    data: ProjectExtraDto

}

export default ShowProjectResDto
