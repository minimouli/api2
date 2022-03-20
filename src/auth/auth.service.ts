/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import Credentials from './schemas/credentials.schema'
import TokenService from './services/token.service'
import AccountService from '../account/account.service'
import Account from '../account/schemas/account.schema'
import type { CredentialsDocument } from './schemas/credentials.schema'

type SuccessLoginResponse = {
    account: Account,
    credentials: Credentials,
    error: null
}

type FailureLoginResponse = {
    account: null,
    credentials: null,
    error: string
}

type LoginResponse = SuccessLoginResponse | FailureLoginResponse

@Injectable()
class AuthService {

    constructor(
        private readonly tokenService: TokenService,
        private readonly accountService: AccountService,
        @InjectModel(Credentials.name) private readonly credentialsModel: Model<CredentialsDocument>
    ) {}

    async findByIdentity(identity: string): Promise<Credentials | null> {
        return this.credentialsModel.findOne({ identity })
            .populate('account')
    }

    async findAndCompare(identity: string, secret: string): Promise<Credentials | null> {

        const credentials = await this.findByIdentity(identity)

        if (!credentials)
            return null

        const compare = await bcrypt.compare(secret, credentials.secret_hash)

        if (!compare)
            return null

        return credentials
    }

    async findByRefreshToken(refreshToken: string): Promise<LoginResponse> {

        const credentials = await this.credentialsModel.findOne({
            refresh_token: refreshToken
        }).populate('account')

        if (!credentials)
            return { error: 'The refresh token is invalid or already used.', account: null, credentials: null }

        return { account: credentials.account, credentials, error: null }
    }

    async signup(identity: string, secret: string): Promise<LoginResponse> {

        const foundAccount = await this.findByIdentity(identity)

        if (foundAccount)
            return { error: 'The identity is already used.', account: null, credentials: null }

        const account = await this.accountService.create()

        const newCredentials = new Credentials()

        newCredentials.identity = identity
        newCredentials.secret_hash = await bcrypt.hash(secret, 12)
        newCredentials.refresh_token = this.tokenService.generateRefreshToken()
        newCredentials.account = account

        await this.credentialsModel.create(newCredentials)

        return { account, credentials: newCredentials, error: null }
    }

    async signin(identity: string, secret: string): Promise<LoginResponse> {

        const credentials = await this.findAndCompare(identity, secret)

        if (!credentials)
            return { error: 'Unable to login.', account: null, credentials: null }

        return { account: credentials.account, credentials, error: null }
    }

    async replaceRefreshToken(account: Account, newRefreshToken: string): Promise<void> {

        await this.credentialsModel.updateOne({
            account: account._id
        }, {
            $set: { refresh_token: newRefreshToken }
        })
    }

}

export default AuthService
export type {
    LoginResponse
}
