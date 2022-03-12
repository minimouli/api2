/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import AccountService from '../../account/account.service'
import type { FullJwtPayload, ValidUser } from '../../types/jwt'

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {

    private accountService: AccountService

    constructor(
        accountService: AccountService,
        configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET')
        })

        this.accountService = accountService
    }

    async validate(payload: FullJwtPayload): Promise<ValidUser> {

        const account = await this.accountService.findByUuid(payload.sub)

        return {
            account
        }
    }

}

export default JwtStrategy
