/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

type JwtPayload = {
    sub: string
}

type FullJwtPayload = JwtPayload & {
    iat: number,
    exp: number
}

type ValidUser = {
    accountUuid: string
}

export type {
    JwtPayload,
    FullJwtPayload,
    ValidUser
}
