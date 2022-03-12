/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

class ProjectPayloadDto {

    @ApiProperty()
    name: string

    @ApiProperty()
    module: string

    @ApiProperty()
    organization: string

}

export default ProjectPayloadDto
