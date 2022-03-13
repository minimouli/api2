/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApiProperty } from '@nestjs/swagger'
import RunPreviewDto from '../../types/dto/run-preview.dto'

class ListRunResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty()
    data: {
        items: RunPreviewDto[],
        limit: number,
        offset: number,
        total: number
    }

}

export default ListRunResDto
