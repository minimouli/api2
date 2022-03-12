/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const generateId = (length: number = 16): string => {

    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456-_'
    const result = []

    while (length--) {
        const pos = Math.floor(Math.random() * alphabet.length)
        result.push(alphabet.charAt(pos))
    }

    return result.join('')
}

export {
    generateId
}
