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
import {
    ApiBadRequestResponse,
    ApiTags
} from '@nestjs/swagger'
import AuthService from './auth.service'
import TokenService from './services/token.service'
import RefreshReqDto from './dto/refresh.req.dto'
import RefreshResDto from './dto/refresh.res.dto'
import SigninReqDto from './dto/signin.req.dto'
import SigninResDto from './dto/signin.res.dto'
import SignupReqDto from './dto/signup.req.dto'
import SignupResDto from './dto/signup.res.dto'

@Controller('/auth')
@ApiTags('auth')
class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly tokenService: TokenService
    ) {}

    @Post('/signup')
    @ApiBadRequestResponse({ description: 'The identity is already used.' })
    async signup(@Body() signupReqDto: SignupReqDto): Promise<SignupResDto> {

        const {
            identity,
            secret
        } = signupReqDto

        const { account, credentials, error } = await this.authService.signup(identity, secret)

        if (error)
            throw new BadRequestException(error)

        const jwt = this.tokenService.generateJwt(account)

        return {
            status: 'success',
            data: {
                uuid: account.uuid,
                token: jwt,
                refresh_token: credentials.refresh_token
            }
        }
    }

    @Post('/signin')
    @HttpCode(200)
    @ApiBadRequestResponse({ description: 'Unable to login.' })
    async signin(@Body() signinReqDto: SigninReqDto): Promise<SigninResDto> {

        const {
            identity,
            secret
        } = signinReqDto

        const { account, credentials, error } = await this.authService.signin(identity, secret)

        if (error)
            throw new BadRequestException(error)

        const jwt = this.tokenService.generateJwt(account)

        return {
            status: 'success',
            data: {
                uuid: account.uuid,
                token: jwt,
                refresh_token: credentials.refresh_token
            }
        }
    }

    @Post('/refresh')
    @HttpCode(200)
    @ApiBadRequestResponse({ description: 'The refresh token is invalid or already used.' })
    async refresh(@Body() refreshReqDto: RefreshReqDto): Promise<RefreshResDto> {

        const { refresh_token } = refreshReqDto

        const { account, credentials, error } = await this.authService.findByRefreshToken(refresh_token)

        if (error)
            throw new BadRequestException(error)

        const newRefreshToken = this.tokenService.generateRefreshToken()
        const jwt = this.tokenService.generateJwt(account)

        await this.authService.replaceRefreshToken(account, newRefreshToken)

        return {
            status: 'success',
            data: {
                uuid: account.uuid,
                token: jwt,
                refresh_token: newRefreshToken
            }
        }
    }

}

export default AuthController
