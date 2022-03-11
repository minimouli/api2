/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { v4 as uuidv4 } from 'uuid'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import Account from './schemas/account.schema'
import type { AccountDocument } from './schemas/account.schema'

@Injectable()
class AccountService {

    constructor(
        @InjectModel(Account.name) private readonly accountModel: Model<AccountDocument>
    ) {}

    async findByUuid(uuid: string): Promise<Account | null> {
        return this.accountModel.findOne({ uuid })
    }

    async create(): Promise<Account> {

        const newAccount = new Account()

        newAccount.uuid = uuidv4()
        newAccount.creation_date = new Date().toISOString()

        return this.accountModel.create(newAccount)
    }

}

export default AccountService
