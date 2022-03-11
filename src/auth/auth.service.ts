/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { JwtService } from '@nestjs/jwt'
import { Model } from 'mongoose'
import Credentials from './schemas/credentials.schema'
import AccountService from '../account/account.service'
import Account from '../account/schemas/account.schema'
import type { CredentialsDocument } from './schemas/credentials.schema'

type SuccessLoginResponse = {
    account: Account,
    error: null
}

type FailureLoginResponse = {
    account: null,
    error: string
}

type LoginResponse = SuccessLoginResponse | FailureLoginResponse

@Injectable()
class AuthService {

    constructor(
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService,
        @InjectModel(Credentials.name) private readonly credentialsModel: Model<CredentialsDocument>
    ) {}

    async findByIdentity(identity: string): Promise<Credentials | null> {
        return this.credentialsModel.findOne({ identity })
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

    async signup(identity: string, secret: string): Promise<LoginResponse> {

        const foundAccount = await this.findByIdentity(identity)

        if (foundAccount)
            return { error: 'The identity is already used.', account: null }

        const account = await this.accountService.create()

        const newCredentials = new Credentials()

        newCredentials.identity = identity
        newCredentials.secret_hash = await bcrypt.hash(secret, 12)
        newCredentials.account_uuid = account.uuid

        await this.credentialsModel.create(newCredentials)

        return { account, error: null }
    }

    async signin(identity: string, secret: string): Promise<LoginResponse> {

        const credentials = await this.findAndCompare(identity, secret)

        if (!credentials)
            return { error: 'Unable to login.', account: null }

        const account = await this.accountService.findByUuid(credentials.account_uuid)

        if (!account)
            return { error: 'The credentials does not correspond to an account.', account: null }

        return { account, error: null }
    }

    generateToken(account: Account): string {

        const payload = {
            sub: account.uuid
        }

        return this.jwtService.sign(payload)
    }

}

export default AuthService
