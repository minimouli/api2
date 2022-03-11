/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    Post
} from '@nestjs/common'
import AuthService from './auth.service'
import SigninReqDto from './dto/signin.req.dto'
import SigninResDto from './dto/signin.res.dto'
import SignupReqDto from './dto/signup.req.dto'
import SignupResDto from './dto/signup.res.dto'

@Controller('/auth')
class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('/signup')
    async signup(@Body() signupReqDto: SignupReqDto): Promise<SignupResDto> {

        const {
            identity,
            secret
        } = signupReqDto

        const { account, error } = await this.authService.signup(identity, secret)

        if (error)
            throw new BadRequestException(error)

        return {
            status: 'success',
            data: {
                uuid: account.uuid
            }
        }
    }

    @Post('/signin')
    @HttpCode(200)
    async signin(@Body() signinReqDto: SigninReqDto): Promise<SigninResDto> {

        const {
            identity,
            secret
        } = signinReqDto

        const { account, error } = await this.authService.signin(identity, secret)

        if (error)
            throw new BadRequestException(error)

        return {
            status: 'success',
            data: {
                uuid: account.uuid
            }
        }
    }

}

export default AuthController
