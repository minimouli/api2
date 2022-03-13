/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const range = (n: number, min: number, max: number, defaultValue: number = 0): number => {
    return Math.max(min, Math.min(max, n || defaultValue))
}

export {
    range
}
