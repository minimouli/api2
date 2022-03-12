/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import SnippetDto from './snippet.dto'
import VariableDto from './variable.dto'

class HintDto {

    @ApiProperty({
        enum: [
            'Hint.COMP',
            'Hint.EQUAL',
            'Hint.STREAM_DIFF',
            'Hint.STRING_DIFF',
            'Hint.TIMEOUT',
            'Hint.MATCHER_ERROR'
        ]
    })
    type: string

    @ApiProperty({
        enum: [
            'Status.SUCCESS',
            'Status.FAILURE'
        ]
    })
    status: string

    @ApiPropertyOptional({
        enum: [
            'Category.OUTPUT',
            'Category.EXIT_CODE',
            'Category.TIMEOUT'
        ]
    })
    category: string

    @ApiPropertyOptional()
    message: string

    /* CompHint */
    @ApiPropertyOptional({
        enum: [
            '<', '>', '<=', '>='
        ]
    })
    symbol: string

    /* TimeoutHint */
    @ApiPropertyOptional()
    timeout: number

    /* CompHint, EqualHint, StringDiffHint */
    @ApiPropertyOptional()
    received: VariableDto

    @ApiPropertyOptional()
    expected: VariableDto

    /* Snippet */
    @ApiPropertyOptional()
    snippet: SnippetDto

}

export default HintDto
