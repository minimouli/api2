/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ApiProperty } from '@nestjs/swagger'
import AccountDto from '../../types/dto/account.dto'

class AccountResDto {

    @ApiProperty()
    status: 'success'

    @ApiProperty()
    data: AccountDto

}

export default AccountResDto
