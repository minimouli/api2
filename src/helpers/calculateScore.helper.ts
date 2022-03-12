/**
 * Copyright (c) Minimouli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Suite from '../types/schemas/suite.schema'

/* ratio */
const calculateRatioFromSuites = (suites: Suite[]): [number, number] => suites.reduce(([effective, total], suite) => {

    const [currentEffective, currentTotal] = calculateRatio(suite)

    return [
        currentEffective + effective,
        currentTotal + total
    ]
}, [0, 0])

const calculateRatio = (suite: Suite): [number, number] => {

    const [nestedEffective, nestedTotal] = calculateRatioFromSuites(suite.suites)

    const [currentEffective, currentTotal] = suite.tests.reduce(([effective, total], test) => {

        if (test.status === 'Status.SUCCESS')
            return [effective + 1, total + 1]

        return [effective, total + 1]
    }, [0, 0])

    const effective = nestedEffective + currentEffective
    const total = nestedTotal + currentTotal

    return [effective, total]
}

/* score */
const calculateScoreFromSuites = (suites: Suite[]): number => {

    const [effective, total] = calculateRatioFromSuites(suites)

    if (total === 0)
        return 1

    return effective / total
}

const calculateScore = (suite: Suite): number => calculateScoreFromSuites([suite])

export {
    calculateScore,
    calculateScoreFromSuites
}
