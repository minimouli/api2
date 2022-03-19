/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import Account from '../../account/schemas/account.schema'

@Injectable()
class TokenService {

    constructor(
        private readonly jwtService: JwtService
    ) {}

    generateJwt(account: Account): string {

        const payload = {
            sub: account.uuid
        }

        return this.jwtService.sign(payload)
    }

}

export default TokenService
